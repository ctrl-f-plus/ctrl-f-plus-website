#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")/.."

MODE="${1:---check}"

if [[ "$MODE" != "--check" && "$MODE" != "--apply" ]]; then
  echo "Usage: scripts/deploy-content.sh [--check|--apply]" >&2
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

require_env_or_env_file_value() {
  local name="$1"
  local path="$2"

  if [[ -n "${!name:-}" ]]; then
    return
  fi

  if ! grep -Eq "^${name}=.+" "$path"; then
    echo "Expected $name to be set in the environment or in $path" >&2
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

require_command aws
require_command jq
require_command pnpm
require_file .env.local
require_file infrastructure/cdk.json

export AWS_REGION="${AWS_REGION:-us-east-2}"
export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-$AWS_REGION}"
export NEXT_PUBLIC_AWS_REGION="${NEXT_PUBLIC_AWS_REGION:-$AWS_REGION}"

require_env_or_env_file_value NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME .env.local
require_env_or_env_file_value NEXT_PUBLIC_APP_URL .env.local
require_env_or_env_file_value NEXT_PUBLIC_AWS_REGION .env.local

if [[ -n "${CDK_STACK_NAME:-}" ]]; then
  STACK_NAME="$CDK_STACK_NAME"
else
  APP_NAME="$(jq -r '.context.appName' infrastructure/cdk.json)"
  ENV_NAME="$(jq -r '.context.environments.prod.envName' infrastructure/cdk.json)"

  if [[ -z "$APP_NAME" || "$APP_NAME" == "null" ]]; then
    echo "Could not resolve appName from infrastructure/cdk.json" >&2
    exit 1
  fi

  if [[ -z "$ENV_NAME" || "$ENV_NAME" == "null" ]]; then
    echo "Could not resolve environments.prod.envName from infrastructure/cdk.json" >&2
    exit 1
  fi

  STACK_NAME="$(to_pascal_case "$APP_NAME")-$(to_pascal_case "$ENV_NAME")"
fi

AWS_ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

echo "Mode: $MODE"
echo "AWS account: $AWS_ACCOUNT_ID"
echo "AWS region: $AWS_REGION"
echo "Stack: $STACK_NAME"

echo
echo "Reading site stack outputs..."
OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query 'Stacks[0].Outputs' \
  --output json)"

BUCKET_NAME="$(read_stack_output "$OUTPUTS_JSON" BucketName)"
DISTRIBUTION_ID="$(read_stack_output "$OUTPUTS_JSON" DistributionId)"
DISTRIBUTION_DOMAIN_NAME="$(read_stack_output "$OUTPUTS_JSON" DistributionDomainName)"

if [[ -z "$BUCKET_NAME" || "$BUCKET_NAME" == "null" ]]; then
  echo "Could not read BucketName from $STACK_NAME outputs." >&2
  exit 1
fi

if [[ -z "$DISTRIBUTION_ID" || "$DISTRIBUTION_ID" == "null" ]]; then
  echo "Could not read DistributionId from $STACK_NAME outputs." >&2
  exit 1
fi

if [[ -z "$DISTRIBUTION_DOMAIN_NAME" || "$DISTRIBUTION_DOMAIN_NAME" == "null" ]]; then
  echo "Could not read DistributionDomainName from $STACK_NAME outputs." >&2
  exit 1
fi

echo "Bucket: $BUCKET_NAME"
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Distribution domain: $DISTRIBUTION_DOMAIN_NAME"

if [[ "$MODE" == "--check" ]]; then
  echo
  echo "Preflight checks passed. Re-run with --apply to build and deploy content."
  exit 0
fi

if [[ ! -x node_modules/.bin/next ]]; then
  echo
  echo "Installing dependencies..."
  CI=true pnpm install --frozen-lockfile
fi

echo
echo "Building static site..."
pnpm build

echo
echo "Syncing dist/ to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" --delete

echo
echo "Invalidating CloudFront..."
INVALIDATION_ID="$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)"

echo
echo "Content deployment completed."
echo "Bucket: $BUCKET_NAME"
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Invalidation ID: $INVALIDATION_ID"
echo "Distribution URL: https://$DISTRIBUTION_DOMAIN_NAME"
