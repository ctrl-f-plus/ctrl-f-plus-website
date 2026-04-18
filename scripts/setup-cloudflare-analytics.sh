#!/usr/bin/env bash

# Provisions a Cloudflare Web Analytics RUM site via the Cloudflare API.
# Returns the site_tag value used as NEXT_PUBLIC_CF_ANALYTICS_TOKEN.
#
# Idempotent: re-running checks for an existing site for the host first.
#
# Usage: scripts/setup-cloudflare-analytics.sh [--check|--apply] [--write-env]
#   --check (default)   Read-only; lists existing sites for the configured host.
#   --apply             Creates the site if it doesn't exist; prints the token.
#   --write-env         Also writes NEXT_PUBLIC_CF_ANALYTICS_TOKEN to .env.local.
#
# Required env vars:
#   CF_API_TOKEN   Cloudflare API token with permission "Account · Web Analytics · Edit".
#                  Create at https://dash.cloudflare.com/profile/api-tokens
#   CF_ACCOUNT_ID  Cloudflare account ID. Find at https://dash.cloudflare.com → right
#                  sidebar of any zone, or via: scripts/setup-cloudflare-analytics.sh --whoami
#
# Reads the host from infrastructure/cdk.json (prod.domainName).

set -euo pipefail

cd "$(dirname "$0")/.."

MODE="--check"
WRITE_ENV="false"
WHOAMI="false"
for arg in "$@"; do
  case "$arg" in
    --check|--apply) MODE="$arg" ;;
    --write-env)     WRITE_ENV="true" ;;
    --whoami)        WHOAMI="true" ;;
    *) echo "Unknown arg: $arg" >&2
       echo "Usage: scripts/setup-cloudflare-analytics.sh [--check|--apply] [--write-env|--whoami]" >&2
       exit 1 ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    echo "Missing required env var: $name" >&2
    echo "See header comment in this script for setup instructions." >&2
    exit 1
  fi
}

require_command curl
require_command jq

require_env CF_API_TOKEN

CF_API="https://api.cloudflare.com/client/v4"

cf() {
  curl -sSf \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    "$@"
}

# ── --whoami: list accounts the token can see, then exit ─────────

if [[ "$WHOAMI" == "true" ]]; then
  echo "Accounts visible to this CF_API_TOKEN:"
  cf "$CF_API/accounts" | jq -r '.result[] | "  \(.id)  \(.name)"'
  exit 0
fi

require_env CF_ACCOUNT_ID
require_command jq

if [[ ! -f infrastructure/cdk.json ]]; then
  echo "Missing infrastructure/cdk.json" >&2
  exit 1
fi

DOMAIN="$(jq -r '.context.environments.prod.domainName' infrastructure/cdk.json)"
if [[ -z "$DOMAIN" || "$DOMAIN" == "null" ]]; then
  echo "Could not resolve environments.prod.domainName from infrastructure/cdk.json" >&2
  exit 1
fi

echo "Mode:      $MODE"
echo "Account:   $CF_ACCOUNT_ID"
echo "Host:      $DOMAIN"
echo

# ── Look for an existing site with this host ─────────────────────

EXISTING="$(cf "$CF_API/accounts/$CF_ACCOUNT_ID/rum/site_info/list" \
  | jq -r --arg host "$DOMAIN" '.result[] | select(.host == $host) | @base64' \
  | head -n1 || true)"

if [[ -n "$EXISTING" ]]; then
  decode() { echo "$EXISTING" | base64 --decode | jq -r "$1"; }
  SITE_TAG="$(decode '.site_tag')"
  SITE_TOKEN="$(decode '.site_token')"
  echo "✓ Web Analytics site already exists for $DOMAIN"
  echo "  site_tag:   $SITE_TAG"
else
  if [[ "$MODE" == "--apply" ]]; then
    RESPONSE="$(cf -X POST \
      "$CF_API/accounts/$CF_ACCOUNT_ID/rum/site_info" \
      --data "$(jq -n --arg host "$DOMAIN" '{host: $host, auto_install: false}')")"
    SITE_TAG="$(echo "$RESPONSE" | jq -r '.result.site_tag')"
    SITE_TOKEN="$(echo "$RESPONSE" | jq -r '.result.site_token')"
    if [[ -z "$SITE_TAG" || "$SITE_TAG" == "null" ]]; then
      echo "Failed to create site. Raw response:" >&2
      echo "$RESPONSE" >&2
      exit 1
    fi
    echo "✓ Created Web Analytics site for $DOMAIN"
    echo "  site_tag:   $SITE_TAG"
  else
    SITE_TAG="<would-be-created>"
    echo "→ would create Web Analytics site for $DOMAIN"
    echo
    echo "Dry-run only. Re-run with --apply to create."
    exit 0
  fi
fi

echo
echo "─── Env-var values ───────────────────────────────────────────"
echo "NEXT_PUBLIC_CF_ANALYTICS_TOKEN=$SITE_TAG"
echo

if [[ "$WRITE_ENV" == "true" ]]; then
  ENV_FILE=".env.local"
  touch "$ENV_FILE"

  upsert_env() {
    local key="$1"
    local value="$2"
    if grep -Eq "^${key}=" "$ENV_FILE"; then
      tmp="$(mktemp)"
      awk -v k="$key" -v v="$value" 'BEGIN{FS=OFS="="} $1==k{$0=k"="v} {print}' "$ENV_FILE" > "$tmp"
      mv "$tmp" "$ENV_FILE"
    else
      echo "${key}=${value}" >> "$ENV_FILE"
    fi
  }

  upsert_env NEXT_PUBLIC_CF_ANALYTICS_TOKEN "$SITE_TAG"
  echo "Wrote env var to $ENV_FILE"
fi

echo
echo "Next steps:"
echo "  1. Set the same var in GitHub repo variables:"
echo "       gh variable set NEXT_PUBLIC_CF_ANALYTICS_TOKEN --body '$SITE_TAG'"
echo "  2. Restart pnpm dev to load the new env var."
echo "  3. View metrics at https://dash.cloudflare.com → Analytics → Web Analytics → $DOMAIN"
