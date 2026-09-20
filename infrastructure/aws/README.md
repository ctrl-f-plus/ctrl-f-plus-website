# Infrastructure

AWS CDK infrastructure for `ctrl-f.plus`. Three stacks, deployed in sequence,
with one account-level prerequisite (GitHub OIDC provider).

## Stack layout

```
HostedZoneStack       (us-east-1)   → Route 53 public hosted zone + NS output
CertificateStack      (us-east-1)   → ACM certificate (DNS-validated)
StaticSiteStack       (us-east-2)   → S3 bucket + CloudFront + OAC +
                                      GitHub Actions OIDC deploy role
```

| Stack                               | Region      | Resources                                                                                |
|-------------------------------------|-------------|------------------------------------------------------------------------------------------|
| `CtrlFPlusWebsite-Prod-HostedZone`  | `us-east-1` | Route 53 public hosted zone                                                              |
| `CtrlFPlusWebsite-Prod-Certificate` | `us-east-1` | ACM certificate (DNS-validated against the hosted zone)                                  |
| `CtrlFPlusWebsite-Prod`             | `us-east-2` | S3 bucket, CloudFront distribution, OAC, Route 53 alias records, GitHub OIDC deploy role |

- `StaticSiteStack` depends on `CertificateStack` (explicit `addDependency`);
  `CertificateStack` depends on `HostedZoneStack` implicitly via the
  `hostedZone` prop.
- Stack names are derived from `cdk.json` context:
  `PascalCase(appName) + '-' + PascalCase(envName)`.

Source: `infrastructure/bin/app.ts`.

## Region rationale

The deployment uses two AWS regions on purpose:

- `AWS_REGION=us-east-2` — site stack region (S3, CloudFront distribution, Route 53 alias records).
- `CLOUDFRONT_CERTIFICATE_REGION=us-east-1` — HostedZone and Certificate stack region.

CloudFront is a global service, but ACM certificates attached to CloudFront
distributions must be created in `us-east-1`. Do not change
`CLOUDFRONT_CERTIFICATE_REGION` to `us-east-2` unless you also change away from
using an ACM certificate on CloudFront.

## Prerequisites

- Node.js `24.x` (see [`../.nvmrc`](../.nvmrc))
- pnpm `10.x` (see `packageManager` in [`../package.json`](../package.json))
- AWS CLI, authenticated against the target account
- `jq`
- `dig`
- `gh` (optional — only if using `scripts/setup-github.sh` to wire GitHub
  repo variables/secrets from the terminal)

Required environment variables before any infrastructure deploy:

```bash
export AWS_REGION=us-east-2
export CLOUDFRONT_CERTIFICATE_REGION=us-east-1
```

## One-time prerequisite — GitHub OIDC provider

`StaticSiteStack` looks up an existing `OpenIdConnectProvider` for
`token.actions.githubusercontent.com` (account-level resource, shared across
stacks). On a clean-slate account, it doesn't exist and must be created before
deploying the site stack. `scripts/initial-aws-deploy.sh` handles this: it
checks first and only creates if missing.

```bash
aws iam list-open-id-connect-providers | grep token.actions.githubusercontent.com
```

If the provider already exists (from another project or manual setup), leave
it alone.

## `.env.local`

Create `.env.local` if it does not exist. At minimum set:

```dotenv
NEXT_PUBLIC_APP_URL=https://ctrl-f.plus
```

The client-side env schema in [`../src/clientEnv.ts`](../src/clientEnv.ts)
validates these `NEXT_PUBLIC_*` values at build time. Only `NEXT_PUBLIC_APP_URL`
is required (defaults to `http://localhost:3000` in dev); the rest are
optional:

- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_CHROME_STORE_URL`
- `NEXT_PUBLIC_GITHUB_EXT_URL`
- `NEXT_PUBLIC_GITHUB_ORGANIZATION_URL`
- `NEXT_PUBLIC_OPEN_COLLECTIVE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` — Cloudflare Web Analytics; see [monitoring/cloudflare-analytics.md](./monitoring/cloudflare-analytics.md)
- `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID` / `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` — CloudWatch RUM; see [monitoring/cloudwatch-rum.md](./monitoring/cloudwatch-rum.md)
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_AWS_REGION` — derived from `AWS_REGION` in the deploy scripts; does not need to be hardcoded

## First-time deployment

```bash
export AWS_REGION=us-east-2
export CLOUDFRONT_CERTIFICATE_REGION=us-east-1

scripts/initial-aws-deploy.sh --check   # preflight: account, diff, env vars
scripts/initial-aws-deploy.sh --apply   # deploys all three stacks, builds site, invalidates CF
```

The script executes the following phases in order:

1. **Preflight** — validates required commands (`aws`, `jq`, `pnpm`, `dig`),
   environment variables (`AWS_REGION`, `CLOUDFRONT_CERTIFICATE_REGION`), and
   `.env.local` presence.
2. **Install dependencies** — runs `pnpm --dir infrastructure install
   --frozen-lockfile` if infrastructure deps are not already present.
3. **CDK diff** — runs `pnpm --dir infrastructure run diff` to show pending
   changes (in `--check` mode the script exits here).
4. **Bootstrap CDK** — bootstraps both `us-east-2` and `us-east-1`.
5. **Ensure GitHub OIDC provider** — checks for and creates the account-level
   OIDC provider if missing.
6. **Deploy HostedZone stack** (`us-east-1`) — creates the Route 53 public
   hosted zone.
7. **Read HostedZone outputs** — retrieves the assigned Route 53 nameservers.
8. **Registrar update (manual)** — prints the nameservers and pauses,
   prompting you to update your registrar nameservers to the Route 53 values
   shown.
9. **DNS delegation check** — polls `dig +short NS` every 30 seconds until the
   public nameservers match the expected Route 53 values (up to ~30 minutes,
   then offers to keep waiting).
10. **Deploy Certificate stack** (`us-east-1`) — creates the ACM certificate
    with DNS validation; validation succeeds automatically because the hosted
    zone is already delegated.
11. **Deploy site stack** (`us-east-2`) — creates the S3 bucket, CloudFront
    distribution, OAC, Route 53 alias records for apex and `www`, and the
    GitHub Actions OIDC deploy role.
12. **Build** — runs `pnpm build` to produce the static export in `dist/`.
13. **Publish** — syncs `dist/` to S3 and invalidates CloudFront.
14. **Done** — prints the bucket name, distribution ID, and distribution
    domain.

> **Note:** The script pauses after deploying the HostedZone stack and prompts
> you to update your registrar nameservers before continuing. Certificate
> validation typically takes 5–30 minutes after nameserver propagation.

## Routine deployment

Production deploys run automatically via GitHub Actions on push to `master`.
See [`../.github/CI-CD.md`](../.github/CI-CD.md) for the pipeline details.

### Content-only changes

New copy, component tweaks, content edits, etc.:

```bash
scripts/deploy-content.sh --apply
```

Reads stack outputs, runs `pnpm build`, syncs to S3, and invalidates
CloudFront. Does NOT run `cdk deploy` or touch infrastructure.

### Infrastructure changes

When files under `infrastructure/` change (CDK constructs, CSP, edge handlers,
CDK config):

```bash
export AWS_REGION=us-east-2
export CLOUDFRONT_CERTIFICATE_REGION=us-east-1

pnpm --dir infrastructure run diff
pnpm --dir infrastructure run deploy
```

CDK will prompt for approval on security-sensitive changes (IAM, security
groups). To deploy a single stack instead of all three:

```bash
pnpm --dir infrastructure exec cdk deploy CtrlFPlusWebsite-Prod
```

### Reading stack outputs

Manual content and infrastructure deploys both need the S3 bucket name and
CloudFront distribution ID. Read them from CloudFormation rather than
hardcoding — the distribution ID changes if the resource is ever recreated:

```bash
aws cloudformation describe-stacks \
  --stack-name CtrlFPlusWebsite-Prod \
  --region us-east-2 \
  --query 'Stacks[0].Outputs' --output table
```

To capture as shell variables:

```bash
OUTPUTS=$(aws cloudformation describe-stacks \
  --stack-name CtrlFPlusWebsite-Prod \
  --region us-east-2 \
  --query 'Stacks[0].Outputs' --output json)

BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="BucketName") | .OutputValue')
DIST_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="DistributionId") | .OutputValue')
```

### Full deploy (infrastructure + content)

When both have changed:

```bash
export AWS_REGION=us-east-2
export CLOUDFRONT_CERTIFICATE_REGION=us-east-1

pnpm --dir infrastructure run deploy
scripts/deploy-content.sh --apply
```

### Preview before deploying

```bash
pnpm dev                                   # local dev server at http://localhost:3000
pnpm build                                 # produce dist/ and inspect it
pnpm --dir infrastructure run diff         # CloudFormation diff without deploying
```

There is no staging environment.

## Post-deployment verification

After the first deploy — or any infrastructure change — verify:

- Homepage loads at `https://ctrl-f.plus` and `https://www.ctrl-f.plus`.
- HTTPS works on both apex and `www`.
- Redirects configured in [`assets/cloudfront/redirects.json`](./assets/cloudfront/redirects.json) behave as expected.
- Static assets (images, fonts, JS bundles) load without 403s.

Verify the CloudFront distribution domain printed by the deploy script:

```bash
curl -I "https://<distribution-domain>"
```

Verify the production domains:

```bash
curl -I "https://ctrl-f.plus"
curl -I "https://www.ctrl-f.plus"
dig NS ctrl-f.plus
```

## Rollback

There is no one-click rollback mechanism.

**Content rollback.** Rebuild from a known-good commit and re-publish:

```bash
git checkout <good-commit>
scripts/deploy-content.sh --apply
```

**Infrastructure rollback.** CloudFormation automatically rolls back failed
stack updates. To revert a successful infrastructure deploy, check out the
previous commit and re-run `pnpm --dir infrastructure run deploy`.

The Route 53 hosted zone records and the S3 bucket have `RETAIN` removal
policies, so accidental stack deletion will not destroy DNS records or site
content.

## Deployment tags

Each successful production deploy creates a semver patch tag (e.g., `v1.0.1`).
The bump logic lives in [`../.github/workflows/deploy-static-site.yml`](../.github/workflows/deploy-static-site.yml).
List deployment tags:

```bash
git tag -l 'v*' --sort=-v:refname
```

## Commands reference

Run from the repo root with `pnpm --dir infrastructure run <script>`, or
change into this directory and run `pnpm run <script>`.

| Command                                       | Purpose                                                               |
|-----------------------------------------------|-----------------------------------------------------------------------|
| `pnpm --dir infrastructure run build`         | Compiles the edge handler and the infrastructure TypeScript sources   |
| `pnpm --dir infrastructure run build:edge`    | Compiles `edge/**/*.ts` into `dist/cloudfront/`                       |
| `pnpm --dir infrastructure run synth`         | Rebuilds the edge handler and synthesizes the CloudFormation template |
| `pnpm --dir infrastructure run diff`          | Rebuilds the edge handler and shows the CloudFormation diff           |
| `pnpm --dir infrastructure run deploy`        | Rebuilds the edge handler and runs `cdk deploy --all`                 |
| `pnpm --dir infrastructure run cdk -- <args>` | Runs the CDK CLI directly for package-local commands                  |

## Package layout

| Path                                                                   | Purpose                                                       |
|------------------------------------------------------------------------|---------------------------------------------------------------|
| [`bin/app.ts`](./bin/app.ts)                                           | CDK app entrypoint — wires and names the three stacks         |
| [`lib/stacks/hosted-zone-stack.ts`](./lib/stacks/hosted-zone-stack.ts) | Route 53 public hosted zone                                   |
| [`lib/stacks/certificate-stack.ts`](./lib/stacks/certificate-stack.ts) | ACM certificate (DNS-validated)                               |
| [`lib/stacks/static-site-stack.ts`](./lib/stacks/static-site-stack.ts) | S3, CloudFront, OAC, Route 53 alias records, OIDC deploy role |
| [`lib/constructs/`](./lib/constructs)                                  | Reusable CDK constructs (static site, CloudFront routing)     |
| [`lib/config/`](./lib/config)                                          | Shared infrastructure configuration and types                 |
| [`edge/`](./edge)                                                      | CloudFront edge handler sources                               |
| [`assets/cloudfront/`](./assets/cloudfront)                            | Static routing inputs (redirects, CloudFront assets)          |
| [`monitoring/`](./monitoring)                                          | RUM / analytics / error-reporting setup docs                  |
| [`cdk.json`](./cdk.json)                                               | Per-environment domain, region, and repo config               |

## GitHub Actions configuration

CI/CD requires these GitHub repo-level values. Set them with:

```bash
scripts/setup-github.sh --check   # shows current state
scripts/setup-github.sh --apply   # writes values via gh CLI
```

| Kind                             | Name                                                                                                                                                                | Source                                                              |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| Secret                           | `AWS_DEPLOY_ROLE_ARN`                                                                                                                                               | CloudFormation output `GitHubActionsDeployRoleArn`                  |
| Variable                         | `NEXT_PUBLIC_APP_URL`                                                                                                                                               | `https://` + `context.environments.prod.domainName` from `cdk.json` |
| Variable                         | `NEXT_PUBLIC_AWS_REGION`                                                                                                                                            | `us-east-2`                                                         |
| Variable                         | `CDK_STACK_NAME`                                                                                                                                                    | Derived from `cdk.json`                                             |
| Variables (ctrl-f-plus specific) | `NEXT_PUBLIC_CHROME_STORE_URL`, `NEXT_PUBLIC_GITHUB_EXT_URL`, `NEXT_PUBLIC_GITHUB_ORGANIZATION_URL`, `NEXT_PUBLIC_OPEN_COLLECTIVE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` | From `.env.local` or prompted                                       |

The script is idempotent; secrets that already exist prompt before overwriting.

See [`../.github/CI-CD.md`](../.github/CI-CD.md) for the full pipeline layout.

## Monitoring & analytics

CloudWatch RUM, Cloudflare Web Analytics, Sentry, and Lighthouse CI are
configured but inert until per-integration env vars are set. Setup docs and
scripts live under [`monitoring/`](./monitoring/README.md).

## Related files

- [`bin/app.ts`](./bin/app.ts) — stack wiring
- [`lib/stacks/`](./lib/stacks) — one file per stack
- [`lib/constructs/static-site.ts`](./lib/constructs/static-site.ts) — CloudFront + S3 + CSP headers
- [`lib/config/site-config.ts`](./lib/config/site-config.ts) — context loading, env resolution
- [`cdk.json`](./cdk.json) — per-environment domain, region, and repo config
- [`monitoring/`](./monitoring) — RUM / analytics / error-reporting setup
- [`../scripts/initial-aws-deploy.sh`](../scripts/initial-aws-deploy.sh) — one-shot first deploy
- [`../scripts/deploy-content.sh`](../scripts/deploy-content.sh) — content-only deploys
- [`../scripts/setup-github.sh`](../scripts/setup-github.sh) — GitHub repo var/secret wiring
- [`../scripts/setup-cloudwatch-rum.sh`](../scripts/setup-cloudwatch-rum.sh) — provision CloudWatch RUM resources
- [`../scripts/setup-cloudflare-analytics.sh`](../scripts/setup-cloudflare-analytics.sh) — provision CF Web Analytics
  site
- [`../.github/workflows/`](../.github/workflows) — CI build + deploy workflows
- [`../.github/CI-CD.md`](../.github/CI-CD.md) — CI/CD pipeline reference

See `.context/plans/cdk-infra-alignment/` for the alignment plan and follow-up
improvements.
