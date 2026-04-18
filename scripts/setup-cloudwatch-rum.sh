#!/usr/bin/env bash

# Provisions the AWS resources that CloudWatch RUM needs:
#   1. Cognito identity pool (allows unauthenticated PutRumEvents from the browser)
#   2. IAM role + policy attached to the pool's unauth identity
#   3. CloudWatch RUM app monitor
#
# Idempotent: re-running re-uses any resources whose names already exist.
#
# Usage: scripts/setup-cloudwatch-rum.sh [--check|--apply] [--write-env]
#   --check (default)   Read-only; prints what would be created or reused.
#   --apply             Creates missing resources; prints final env-var values.
#   --write-env         Also writes NEXT_PUBLIC_CW_RUM_* to .env.local on --apply.
#
# Reads context from infrastructure/cdk.json (appName, prod.domainName) so the
# created resources match the site's naming.

set -euo pipefail

cd "$(dirname "$0")/.."

MODE="--check"
WRITE_ENV="false"
for arg in "$@"; do
  case "$arg" in
    --check|--apply) MODE="$arg" ;;
    --write-env)     WRITE_ENV="true" ;;
    *) echo "Unknown arg: $arg" >&2
       echo "Usage: scripts/setup-cloudwatch-rum.sh [--check|--apply] [--write-env]" >&2
       exit 1 ;;
  esac
done

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    echo "Missing required file: $path" >&2
    exit 1
  fi
}

require_command aws
require_command jq
require_file infrastructure/cdk.json

export AWS_REGION="${AWS_REGION:-us-east-2}"
export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-$AWS_REGION}"

APP_NAME="$(jq -r '.context.appName' infrastructure/cdk.json)"
DOMAIN="$(jq -r '.context.environments.prod.domainName' infrastructure/cdk.json)"

if [[ -z "$APP_NAME" || "$APP_NAME" == "null" ]]; then
  echo "Could not resolve appName from infrastructure/cdk.json" >&2
  exit 1
fi
if [[ -z "$DOMAIN" || "$DOMAIN" == "null" ]]; then
  echo "Could not resolve environments.prod.domainName from infrastructure/cdk.json" >&2
  exit 1
fi

POOL_NAME="${APP_NAME}-rum"
ROLE_NAME="$(echo "$APP_NAME" | tr -d '-' | awk '{print toupper(substr($0,1,1)) substr($0,2)}')RumUnauth"
MONITOR_NAME="$APP_NAME"

ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

echo "Mode:           $MODE"
echo "AWS account:    $ACCOUNT_ID"
echo "AWS region:     $AWS_REGION"
echo "Domain:         $DOMAIN"
echo "Cognito pool:   $POOL_NAME"
echo "IAM role:       $ROLE_NAME"
echo "RUM monitor:    $MONITOR_NAME"
echo

# ── 1. Cognito identity pool ──────────────────────────────────────

POOL_ID="$(aws cognito-identity list-identity-pools --max-results 60 \
  --query "IdentityPools[?IdentityPoolName=='$POOL_NAME'].IdentityPoolId" \
  --output text 2>/dev/null || true)"

if [[ -n "$POOL_ID" && "$POOL_ID" != "None" ]]; then
  echo "✓ Cognito identity pool exists: $POOL_ID"
else
  if [[ "$MODE" == "--apply" ]]; then
    POOL_ID="$(aws cognito-identity create-identity-pool \
      --identity-pool-name "$POOL_NAME" \
      --allow-unauthenticated-identities \
      --query IdentityPoolId --output text)"
    echo "✓ Created Cognito identity pool: $POOL_ID"
  else
    POOL_ID="<would-be-created>"
    echo "→ would create Cognito identity pool: $POOL_NAME"
  fi
fi

# ── 2. IAM role + policy ─────────────────────────────────────────

ROLE_ARN="$(aws iam get-role --role-name "$ROLE_NAME" \
  --query Role.Arn --output text 2>/dev/null || true)"

if [[ -n "$ROLE_ARN" ]]; then
  echo "✓ IAM role exists: $ROLE_ARN"
else
  if [[ "$MODE" == "--apply" ]]; then
    if [[ "$POOL_ID" == "<would-be-created>" ]]; then
      echo "Cannot create role until pool exists." >&2
      exit 1
    fi

    TRUST_POLICY="$(cat <<JSON
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "cognito-identity.amazonaws.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "cognito-identity.amazonaws.com:aud": "$POOL_ID" },
      "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" }
    }
  }]
}
JSON
)"
    ROLE_ARN="$(aws iam create-role \
      --role-name "$ROLE_NAME" \
      --assume-role-policy-document "$TRUST_POLICY" \
      --description "Allows browser RUM clients to PutRumEvents for $APP_NAME" \
      --query Role.Arn --output text)"
    echo "✓ Created IAM role: $ROLE_ARN"

    aws iam put-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-name PutRumEvents \
      --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"rum:PutRumEvents","Resource":"*"}]}'
    echo "  attached policy: PutRumEvents"

    aws cognito-identity set-identity-pool-roles \
      --identity-pool-id "$POOL_ID" \
      --roles "unauthenticated=$ROLE_ARN"
    echo "  attached role to pool's unauthenticated identity"
  else
    ROLE_ARN="<would-be-created>"
    echo "→ would create IAM role: $ROLE_NAME (with PutRumEvents policy + pool wiring)"
  fi
fi

# ── 3. RUM app monitor ───────────────────────────────────────────

MONITOR_ID="$(aws rum get-app-monitor --name "$MONITOR_NAME" \
  --query AppMonitor.Id --output text 2>/dev/null || true)"

if [[ -n "$MONITOR_ID" && "$MONITOR_ID" != "None" ]]; then
  echo "✓ RUM app monitor exists: $MONITOR_ID"
else
  if [[ "$MODE" == "--apply" ]]; then
    if [[ "$POOL_ID" == "<would-be-created>" || "$ROLE_ARN" == "<would-be-created>" ]]; then
      echo "Cannot create monitor until pool + role exist." >&2
      exit 1
    fi

    aws rum create-app-monitor \
      --name "$MONITOR_NAME" \
      --domain "$DOMAIN" \
      --cw-log-enabled \
      --app-monitor-configuration "$(cat <<JSON
{
  "AllowCookies": true,
  "EnableXRay": false,
  "GuestRoleArn": "$ROLE_ARN",
  "IdentityPoolId": "$POOL_ID",
  "SessionSampleRate": 1,
  "Telemetries": ["performance", "errors", "http"]
}
JSON
)" >/dev/null

    MONITOR_ID="$(aws rum get-app-monitor --name "$MONITOR_NAME" \
      --query AppMonitor.Id --output text)"
    echo "✓ Created RUM app monitor: $MONITOR_ID"
  else
    MONITOR_ID="<would-be-created>"
    echo "→ would create RUM app monitor: $MONITOR_NAME (domain=$DOMAIN)"
  fi
fi

echo
echo "─── Env-var values ───────────────────────────────────────────"
echo "NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID=$MONITOR_ID"
echo "NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID=$POOL_ID"
echo "NEXT_PUBLIC_AWS_REGION=$AWS_REGION"
echo

if [[ "$MODE" != "--apply" ]]; then
  echo "Dry-run only. Re-run with --apply to provision."
  exit 0
fi

# ── 4. Optional: write to .env.local ──────────────────────────────

if [[ "$WRITE_ENV" == "true" ]]; then
  ENV_FILE=".env.local"
  touch "$ENV_FILE"

  upsert_env() {
    local key="$1"
    local value="$2"
    if grep -Eq "^${key}=" "$ENV_FILE"; then
      # macOS sed compatibility: write to tmp + move
      tmp="$(mktemp)"
      awk -v k="$key" -v v="$value" 'BEGIN{FS=OFS="="} $1==k{$0=k"="v} {print}' "$ENV_FILE" > "$tmp"
      mv "$tmp" "$ENV_FILE"
    else
      echo "${key}=${value}" >> "$ENV_FILE"
    fi
  }

  upsert_env NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID "$MONITOR_ID"
  upsert_env NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID "$POOL_ID"
  echo "Wrote env vars to $ENV_FILE"
fi

echo
echo "Next steps:"
echo "  1. Set the same vars in GitHub repo variables (or extend setup-github.sh):"
echo "       gh variable set NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID --body '$MONITOR_ID'"
echo "       gh variable set NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID --body '$POOL_ID'"
echo "  2. Restart pnpm dev to load the new env vars."
echo "  3. View metrics at AWS Console → CloudWatch → RUM → $MONITOR_NAME"