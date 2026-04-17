#!/usr/bin/env bash

#  export AWS_REGION=us-east-2
#  export CLOUDFRONT_CERTIFICATE_REGION=us-east-1

set -euo pipefail

cd "$(dirname "$0")/.."

MODE="${1:---check}"

if [[ "$MODE" != "--check" && "$MODE" != "--apply" ]]; then
  echo "Usage: scripts/initial-aws-deploy.sh [--check|--apply]" >&2
  exit 1
fi

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_env() {
  local name="$1"

  if [[ -z "${!name:-}" ]]; then
    echo "Missing required environment variable: $name" >&2
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

require_env_file_value() {
  local name="$1"
  local path="$2"

  if ! grep -Eq "^${name}=.+" "$path"; then
    echo "Expected $name to be set in $path" >&2
    exit 1
  fi
}

normalize_ns() {
  tr ',' '\n' | sed 's/\.$//' | tr '[:upper:]' '[:lower:]' | sed '/^$/d' | sort -u
}

require_command aws
require_command jq
require_command pnpm
require_command dig

require_env AWS_REGION
require_env CLOUDFRONT_CERTIFICATE_REGION

AWS_ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-$AWS_REGION}"
export CDK_DEFAULT_REGION="${CDK_DEFAULT_REGION:-$AWS_REGION}"
export CDK_DEFAULT_ACCOUNT="${CDK_DEFAULT_ACCOUNT:-$AWS_ACCOUNT_ID}"

to_pascal_case() {
  local IFS='-'
  local result=""
  for segment in $1; do
    result+="$(printf '%s' "${segment:0:1}" | tr '[:lower:]' '[:upper:]')${segment:1}"
  done
  printf '%s' "$result"
}

if [[ -n "${CDK_STACK_NAME:-}" ]]; then
  STACK_NAME="$CDK_STACK_NAME"
else
  APP_NAME="$(jq -r '.context.appName' infrastructure/cdk.json)"
  ENV_NAME="prod"
  if [[ -z "$APP_NAME" || "$APP_NAME" == "null" ]]; then
    echo "Could not resolve appName from infrastructure/cdk.json" >&2
    exit 1
  fi
  STACK_NAME="$(to_pascal_case "$APP_NAME")-$(to_pascal_case "$ENV_NAME")"
fi

HOSTED_ZONE_STACK_NAME="${STACK_NAME}-HostedZone"
CERT_STACK_NAME="${STACK_NAME}-Certificate"

DOMAIN_NAME="$(jq -r '.context.environments.prod.domainName' infrastructure/cdk.json)"

require_file .env.local
require_env_file_value NEXT_PUBLIC_APP_URL .env.local

export NEXT_PUBLIC_AWS_REGION="${NEXT_PUBLIC_AWS_REGION:-$AWS_REGION}"

echo "Mode: $MODE"
echo "AWS_REGION: $AWS_REGION"
echo "NEXT_PUBLIC_AWS_REGION: $NEXT_PUBLIC_AWS_REGION"
echo "CLOUDFRONT_CERTIFICATE_REGION: $CLOUDFRONT_CERTIFICATE_REGION"
echo "CDK_DEFAULT_ACCOUNT: $CDK_DEFAULT_ACCOUNT"
echo "CDK hosted zone stack: $HOSTED_ZONE_STACK_NAME"
echo "CDK certificate stack: $CERT_STACK_NAME"
echo "CDK site stack: $STACK_NAME"
echo "Domain: $DOMAIN_NAME"

echo
if [[ ! -x infrastructure/node_modules/.bin/ts-node || ! -x infrastructure/node_modules/.bin/cdk ]]; then
  echo "Installing infrastructure dependencies..."
  CI=true pnpm --dir infrastructure install --frozen-lockfile
else
  echo "Infrastructure dependencies already installed."
fi

echo
echo "Checking infrastructure diff..."
pnpm --dir infrastructure run diff

if [[ "$MODE" == "--check" ]]; then
  echo
  echo "Preflight checks passed. Re-run with --apply to deploy."
  exit 0
fi

echo
echo "Bootstrapping CDK (${CDK_DEFAULT_REGION})..."
pnpm --dir infrastructure exec cdk bootstrap \
  "aws://$CDK_DEFAULT_ACCOUNT/$CDK_DEFAULT_REGION"

echo
echo "Bootstrapping CDK (${CLOUDFRONT_CERTIFICATE_REGION})..."
pnpm --dir infrastructure exec cdk bootstrap \
  "aws://$CDK_DEFAULT_ACCOUNT/$CLOUDFRONT_CERTIFICATE_REGION"

echo
echo "Deploying Hosted Zone stack (${CLOUDFRONT_CERTIFICATE_REGION})..."
pnpm --dir infrastructure exec cdk deploy "$HOSTED_ZONE_STACK_NAME" --require-approval never

echo
echo "Reading Hosted Zone stack outputs..."
HZ_OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$HOSTED_ZONE_STACK_NAME" \
  --region "$CLOUDFRONT_CERTIFICATE_REGION" \
  --query 'Stacks[0].Outputs' \
  --output json)"

NAME_SERVERS="$(echo "$HZ_OUTPUTS_JSON" | jq -r '.[] | select(.OutputKey=="NameServers") | .OutputValue')"

if [[ -z "$NAME_SERVERS" ]]; then
  echo "Could not read nameservers from Hosted Zone stack." >&2
  exit 1
fi

echo
echo "============================================"
echo "ACTION REQUIRED: Update registrar nameservers"
echo "============================================"
echo "Route 53 nameservers for ${DOMAIN_NAME}:"
echo "$NAME_SERVERS" | tr ',' '\n' | sed 's/^/  /'
echo
echo "Update your domain registrar to use the nameservers above, then"
echo "press Enter to begin verifying DNS delegation."
read -r

echo
echo "Verifying nameserver delegation for ${DOMAIN_NAME}..."
EXPECTED_NS="$(echo "$NAME_SERVERS" | normalize_ns)"
MAX_ATTEMPTS=60
ATTEMPT=0
while true; do
  ACTUAL_NS="$(dig +short NS "$DOMAIN_NAME" | normalize_ns)"
  if [[ "$ACTUAL_NS" == "$EXPECTED_NS" ]]; then
    echo "Nameserver delegation confirmed."
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  if [[ $ATTEMPT -ge $MAX_ATTEMPTS ]]; then
    echo "Delegation not confirmed after $MAX_ATTEMPTS attempts (~30 minutes)." >&2
    echo "Expected:" >&2
    echo "$EXPECTED_NS" >&2
    echo "Got:" >&2
    echo "$ACTUAL_NS" >&2
    echo "Press Ctrl+C to abort, or Enter to keep waiting." >&2
    read -r
    ATTEMPT=0
  fi
  echo "  Waiting for delegation (attempt $ATTEMPT/$MAX_ATTEMPTS, checking every 30s)..."
  sleep 30
done

# ── Phase 3: Certificate ──────────────────────────────────────

echo
echo "Deploying Certificate stack (${CLOUDFRONT_CERTIFICATE_REGION})..."
pnpm --dir infrastructure exec cdk deploy "$CERT_STACK_NAME" --require-approval never

echo
echo "Reading Certificate stack outputs..."
CERT_OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$CERT_STACK_NAME" \
  --region "$CLOUDFRONT_CERTIFICATE_REGION" \
  --query 'Stacks[0].Outputs' \
  --output json)"

CERT_ARN="$(echo "$CERT_OUTPUTS_JSON" | jq -r '.[] | select(.OutputKey=="CertificateArn") | .OutputValue')"

if [[ -z "$CERT_ARN" ]]; then
  echo "Could not read certificate ARN from Certificate stack." >&2
  exit 1
fi

echo "Certificate ARN: $CERT_ARN"

# ── Phase 4: Site stack ───────────────────────────────────────

echo
echo "Ensuring GitHub OIDC provider exists..."
if aws iam list-open-id-connect-providers \
  --query "OpenIDConnectProviderList[?ends_with(Arn, '/token.actions.githubusercontent.com')]" \
  --output text | grep -q 'arn:aws'; then
  echo "GitHub OIDC provider already exists — skipping creation."
else
  echo "Creating GitHub OIDC provider..."
  aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
fi

echo
echo "Deploying site stack (${AWS_REGION})..."
pnpm --dir infrastructure exec cdk deploy "$STACK_NAME" --require-approval never

echo
echo "Reading site stack outputs..."
OUTPUTS_JSON="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query 'Stacks[0].Outputs' \
  --output json)"

BUCKET_NAME="$(echo "$OUTPUTS_JSON" | jq -r '.[] | select(.OutputKey=="BucketName") | .OutputValue')"
DISTRIBUTION_ID="$(echo "$OUTPUTS_JSON" | jq -r '.[] | select(.OutputKey=="DistributionId") | .OutputValue')"
DISTRIBUTION_DOMAIN_NAME="$(echo "$OUTPUTS_JSON" | jq -r '.[] | select(.OutputKey=="DistributionDomainName") | .OutputValue')"

if [[ -z "$BUCKET_NAME" || -z "$DISTRIBUTION_ID" || -z "$DISTRIBUTION_DOMAIN_NAME" ]]; then
  echo "One or more required site stack outputs were missing." >&2
  exit 1
fi

echo
echo "Building static site..."
pnpm build

echo
echo "Syncing dist/ to S3..."
aws s3 sync dist/ "s3://$BUCKET_NAME" --delete

echo
echo "Invalidating CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo
echo "Initial deployment completed."
echo "Bucket: $BUCKET_NAME"
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Distribution domain: $DISTRIBUTION_DOMAIN_NAME"
echo
echo "Next steps:"
echo "1. Verify the site on https://$DISTRIBUTION_DOMAIN_NAME"
echo "2. Verify https://$DOMAIN_NAME"
