#!/usr/bin/env bash

# Sets the GitHub repository variables and secrets that CI/CD workflows expect.
# Run AFTER the CDK site stack has deployed (so CloudFormation outputs exist).
#
# Usage: scripts/setup-github.sh [--check|--apply]
#   --check (default)  Read-only; shows current state and what --apply would do.
#   --apply            Sets variables/secrets in GitHub via the gh CLI.
#
# Secrets prompt before overwriting an existing value. Variables are set
# unconditionally (they are non-sensitive and idempotent to re-set).

set -euo pipefail

cd "$(dirname "$0")/.."

MODE="${1:---check}"

if [[ "$MODE" != "--check" && "$MODE" != "--apply" ]]; then
  echo "Usage: scripts/setup-github.sh [--check|--apply]" >&2
  exit 1
fi

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

to_pascal_case() {
  local IFS='-'
  local result=""
  for segment in $1; do
    result+="$(printf '%s' "${segment:0:1}" | tr '[:lower:]' '[:upper:]')${segment:1}"
  done
  printf '%s' "$result"
}

read_stack_output() {
  local outputs_json="$1"
  local output_key="$2"
  echo "$outputs_json" | jq -r --arg key "$output_key" \
    '.[] | select(.OutputKey==$key) | .OutputValue'
}

# env-or-.env.local reader: returns the value or empty string
read_env_or_local() {
  local name="$1"
  if [[ -n "${!name:-}" ]]; then
    printf '%s' "${!name}"
    return
  fi
  if [[ -f .env.local ]]; then
    grep -E "^${name}=" .env.local | head -n1 | cut -d'=' -f2- | sed -e 's/^"//' -e 's/"$//' || true
  fi
}

# gh variable helpers
gh_var_get() {
  local name="$1"
  gh variable get "$name" --repo "$GITHUB_REPO" 2>/dev/null || true
}

gh_var_set() {
  local name="$1"
  local value="$2"
  if [[ "$MODE" == "--apply" ]]; then
    printf '%s' "$value" | gh variable set "$name" --repo "$GITHUB_REPO" --body -
    echo "  set var: $name"
  else
    echo "  would set var: $name = $value"
  fi
}

gh_secret_set_if_new_or_confirmed() {
  local name="$1"
  local value="$2"
  local existing
  existing="$(gh secret list --repo "$GITHUB_REPO" --json name --jq ".[] | select(.name==\"$name\") | .name" 2>/dev/null || true)"

  if [[ -n "$existing" ]]; then
    if [[ "$MODE" == "--apply" ]]; then
      read -r -p "Secret '$name' already exists. Overwrite? [y/N] " ans
      if [[ "$ans" =~ ^[Yy]$ ]]; then
        printf '%s' "$value" | gh secret set "$name" --repo "$GITHUB_REPO" --body -
        echo "  overwrote secret: $name"
      else
        echo "  kept existing secret: $name"
      fi
    else
      echo "  would prompt to overwrite secret: $name (exists)"
    fi
    return
  fi

  if [[ "$MODE" == "--apply" ]]; then
    printf '%s' "$value" | gh secret set "$name" --repo "$GITHUB_REPO" --body -
    echo "  set secret: $name"
  else
    echo "  would set secret: $name"
  fi
}

# Preflight
require_command aws
require_command jq
require_command gh
require_file infrastructure/cdk.json

if ! gh auth status >/dev/null 2>&1; then
  echo "gh CLI is not authenticated. Run: gh auth login" >&2
  exit 1
fi

export AWS_REGION="${AWS_REGION:-us-east-2}"
export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-$AWS_REGION}"

GITHUB_REPO="$(jq -r '.context.githubRepository' infrastructure/cdk.json)"
if [[ -z "$GITHUB_REPO" || "$GITHUB_REPO" == "null" ]]; then
  echo "context.githubRepository not set in infrastructure/cdk.json" >&2
  exit 1
fi

if [[ -n "${CDK_STACK_NAME:-}" ]]; then
  STACK_NAME="$CDK_STACK_NAME"
else
  APP_NAME="$(jq -r '.context.appName' infrastructure/cdk.json)"
  ENV_NAME="$(jq -r '.context.environments.prod.envName' infrastructure/cdk.json)"
  STACK_NAME="$(to_pascal_case "$APP_NAME")-$(to_pascal_case "$ENV_NAME")"
fi

echo "Mode: $MODE"
echo "Repo: $GITHUB_REPO"
echo "AWS region: $AWS_REGION"
echo "Stack: $STACK_NAME"
echo

# Read site stack outputs
echo "Reading CloudFormation outputs from $STACK_NAME..."
OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query 'Stacks[0].Outputs' \
  --output json 2>/dev/null || true)"

if [[ -z "$OUTPUTS_JSON" || "$OUTPUTS_JSON" == "null" ]]; then
  echo "Stack '$STACK_NAME' not found or has no outputs. Deploy the site stack first." >&2
  exit 1
fi

DEPLOY_ROLE_ARN="$(read_stack_output "$OUTPUTS_JSON" GitHubActionsDeployRoleArn)"
if [[ -z "$DEPLOY_ROLE_ARN" || "$DEPLOY_ROLE_ARN" == "null" ]]; then
  echo "CloudFormation output 'GitHubActionsDeployRoleArn' not found in $STACK_NAME." >&2
  echo "Make sure the stack exposes the deploy role." >&2
  exit 1
fi

# Resolve variables
DOMAIN_NAME="$(jq -r '.context.environments.prod.domainName' infrastructure/cdk.json)"
APP_URL="https://$DOMAIN_NAME"

echo
echo "Variables:"
gh_var_set NEXT_PUBLIC_APP_URL "$APP_URL"
gh_var_set NEXT_PUBLIC_AWS_REGION "$AWS_REGION"
gh_var_set CDK_STACK_NAME "$STACK_NAME"

# ctrl-f-plus-specific NEXT_PUBLIC_* vars — read from env or .env.local,
# skip (with notice) if neither is set. User can set these manually later.
for name in \
  NEXT_PUBLIC_CHROME_STORE_URL \
  NEXT_PUBLIC_GITHUB_EXT_URL \
  NEXT_PUBLIC_GITHUB_ORGANIZATION_URL \
  NEXT_PUBLIC_OPEN_COLLECTIVE_URL \
  NEXT_PUBLIC_CONTACT_EMAIL; do
  value="$(read_env_or_local "$name")"
  if [[ -z "$value" ]]; then
    echo "  skip: $name (not set in environment or .env.local)"
    continue
  fi
  gh_var_set "$name" "$value"
done

echo
echo "Secrets:"
gh_secret_set_if_new_or_confirmed AWS_DEPLOY_ROLE_ARN "$DEPLOY_ROLE_ARN"

echo
if [[ "$MODE" == "--check" ]]; then
  echo "Dry-run complete. Re-run with --apply to persist these values."
else
  echo "Setup complete."
fi
