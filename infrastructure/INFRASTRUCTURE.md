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

- The `StaticSiteStack` depends on `CertificateStack` (explicit
  `addDependency`); `CertificateStack` depends on `HostedZoneStack` implicitly
  via the `hostedZone` prop.
- CloudFront requires its certificate in `us-east-1`, so the zone + cert live
  there. The site stack lives in `us-east-2`.
- Stack names are derived from `cdk.json` context:
  `PascalCase(appName) + '-' + PascalCase(envName)` →
  `CtrlFPlusWebsite-Prod`, `CtrlFPlusWebsite-Prod-HostedZone`,
  `CtrlFPlusWebsite-Prod-Certificate`.

Source: `infrastructure/bin/app.ts`.

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

## First-time deployment

```bash
export AWS_REGION=us-east-2
export CLOUDFRONT_CERTIFICATE_REGION=us-east-1

scripts/initial-aws-deploy.sh --check   # preflight: account, diff, env vars
scripts/initial-aws-deploy.sh --apply   # deploys all three stacks, builds site, invalidates CF
```

The script will pause after the hosted zone deploys to let you update your
registrar's nameservers to the Route 53 NS records. It polls `dig +short NS`
until delegation is confirmed (up to ~30 min).

## Routine deployment

- **Content-only changes** (new blog post, copy tweak, etc.):
  ```bash
  scripts/deploy-content.sh --apply
  ```
  Reads stack outputs, runs `pnpm build`, syncs to S3, invalidates CloudFront.
  Does NOT touch CDK.

- **Infrastructure changes** (CDK constructs, CSP, etc.): work in
  `infrastructure/`, then:
  ```bash
  pnpm --dir infrastructure run diff
  pnpm --dir infrastructure run deploy
  ```
  Production deploys via GitHub Actions on push to `master`.

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

## Monitoring & analytics

CloudWatch RUM, Cloudflare Web Analytics, Sentry, and Lighthouse CI are
configured but inert until per-integration env vars are set. Setup docs and
scripts live under [`monitoring/`](./monitoring/README.md).

## Related files

- `infrastructure/bin/app.ts` — stack wiring
- `infrastructure/lib/stacks/` — one file per stack
- `infrastructure/lib/constructs/static-site.ts` — CloudFront + S3 + CSP headers
- `infrastructure/lib/config/site-config.ts` — context loading, env resolution
- `infrastructure/cdk.json` — per-environment domain, region, and repo config
- `infrastructure/monitoring/` — RUM / analytics / error-reporting setup
- `scripts/initial-aws-deploy.sh` — one-shot first deploy
- `scripts/deploy-content.sh` — content-only deploys
- `scripts/setup-github.sh` — GitHub repo var/secret wiring
- `scripts/setup-cloudwatch-rum.sh` — provision CloudWatch RUM resources
- `scripts/setup-cloudflare-analytics.sh` — provision CF Web Analytics site
- `.github/workflows/` — CI build + deploy workflows

See `.context/plans/cdk-infra-alignment/` for the alignment plan and follow-up
improvements.
