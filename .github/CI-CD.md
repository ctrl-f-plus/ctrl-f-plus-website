[//]: # (.github/CI-CD.md)

## CI/CD & Automation

This repo uses GitHub Actions to build and deploy a static Next.js export to
AWS S3 + CloudFront. The deploy workflow assumes the infrastructure stack
already exists and reads its deploy targets from CloudFormation outputs.

For the infrastructure runbook (first deploy, routine deploys, rollback) see
[`../infrastructure/INFRASTRUCTURE.md`](../infrastructure/INFRASTRUCTURE.md).

### Workflow Layout

| Workflow               | File                                                                               | Trigger                                                     | Purpose                                                                                                |
|------------------------|------------------------------------------------------------------------------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| CI                     | [`./workflows/ci.yml`](./workflows/ci.yml)                                         | Push to `master`, pull request to `master`, manual dispatch | Orchestrates workflow linting, build, and gated deploy                                                  |
| GitHub Workflow Lint   | [`./workflows/github-workflow-lint.yml`](./workflows/github-workflow-lint.yml)     | `workflow_call`                                             | Installs actionlint and validates workflow files                                                        |
| Build Static Site      | [`./workflows/build-static-site.yml`](./workflows/build-static-site.yml)           | `workflow_call`                                             | Builds the static site and uploads the deployable `dist/` artifact                                      |
| Deploy Static Site     | [`./workflows/deploy-static-site.yml`](./workflows/deploy-static-site.yml)         | `workflow_call`                                             | Downloads the artifact, deploys it to AWS, invalidates CloudFront, and creates the next deployment tag  |
| Lighthouse Static Site | [`./workflows/lighthouse-static-site.yml`](./workflows/lighthouse-static-site.yml) | `workflow_call`                                             | Reusable Lighthouse CI audit — **currently disabled** in `ci.yml` (commented out)                       |

### Live CI Flow

The top-level CI workflow in [`./workflows/ci.yml`](./workflows/ci.yml) wires
the reusable workflows together with the current repo defaults:

| Setting          | Current value                              |
|------------------|--------------------------------------------|
| `AWS_REGION`     | GitHub repo variable `vars.AWS_REGION`     |
| `CDK_STACK_NAME` | GitHub repo variable `vars.CDK_STACK_NAME` |
| `APP_URL`        | GitHub repo variable `vars.APP_URL`        |
| `ARTIFACT_NAME`  | `dist`                                     |
| `TAG_PREFIX`     | `v`                                        |

Concurrency group `ci-${{ github.ref }}`; `cancel-in-progress` is `true` on
non-`master` branches and `false` on `master` (master runs always complete so
every commit that reaches the default branch produces a deployable artifact).

Jobs run in this order:

| Job                  | What it does                                                                                                                                                |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GitHub Workflow Lint | Checks out the repo, installs the pinned actionlint binary, and validates `.github/workflows/*.yml`                                                         |
| Build                | Checks out the repo, installs pnpm, sets up Node from [`../.nvmrc`](../.nvmrc), runs `pnpm install --frozen-lockfile`, runs `pnpm build`, and uploads `dist/` |
| Deploy               | Runs only after GitHub Workflow Lint and Build succeed, and only for `push` or `workflow_dispatch` on `refs/heads/master`                                   |

Workflow linting is intentionally scoped to workflow files only. It does not
validate repo-local composite action metadata under `.github/actions/`.

### GitHub Workflow Linting

Defined in [`./workflows/github-workflow-lint.yml`](./workflows/github-workflow-lint.yml).
Installs the pinned actionlint release (`ACTIONLINT_VERSION=1.7.11`) for the
runner's architecture (`amd64` / `arm64`) and runs `actionlint` from repo root.

### Build Artifact

The deploy artifact is the static export in `dist/`.

- [`../next.config.js`](../next.config.js) sets `output: 'export'`.
- [`../package.json`](../package.json) defines the `build` script used by CI.

### Lighthouse Behavior

The `lighthouse` job is currently **commented out** in
[`./workflows/ci.yml`](./workflows/ci.yml). The reusable workflow
[`./workflows/lighthouse-static-site.yml`](./workflows/lighthouse-static-site.yml)
is kept in the repo so it can be re-enabled without restoration. If you
re-enable it: uncomment the `lighthouse` job block and add `lighthouse` back
to the `deploy` job's `needs` list.

### Deployment Behavior

Deploy is defined in [`./workflows/deploy-static-site.yml`](./workflows/deploy-static-site.yml).

| Step                  | What it does                                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| Checkout              | Checks out the repo with `fetch-depth: 0` so tags are available                                                 |
| Download artifact     | Downloads the `dist/` artifact into `dist/`                                                                     |
| Configure AWS         | Uses GitHub OIDC with `AWS_DEPLOY_ROLE_ARN` via `aws-actions/configure-aws-credentials@v4`                      |
| Print OIDC subject    | Debug-only (`runner.debug == '1'`) — decodes the GitHub-issued OIDC JWT claims for IAM trust policy verification |
| Read stack outputs    | Calls `aws cloudformation describe-stacks` for `cdk_stack_name` and reads `BucketName` and `DistributionId`     |
| Sync to S3            | Runs `aws s3 sync dist/ "s3://$BUCKET" --delete`                                                                |
| Invalidate CloudFront | Runs `aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*"`                             |
| Tag deployment        | Fetches tags, finds the latest matching semver tag, bumps the patch version, creates the new tag, and pushes it |

Additional live deploy behavior:

- Deploys are serialized with the `production-deploy` concurrency group.
- `cancel-in-progress` is `false`.
- Timeout is 15 minutes.
- This workflow deploys static assets only. It does not run `cdk deploy` or
  update infrastructure.

### Versioning

Successful deploys create the next patch tag matching `TAG_PREFIX`. The bump
logic is inline in the deploy workflow.

| Example                | Result                        |
|------------------------|-------------------------------|
| No existing tags       | `v0.0.1`                      |
| Latest tag is `v1.0.0` | Next deploy creates `v1.0.1`  |
| Latest tag is `v1.4.9` | Next deploy creates `v1.4.10` |

If you manually create a higher semver tag, future deploys continue patch
bumps from that latest tag.

List deployment tags:

```bash
git tag -l 'v*' --sort=-v:refname
```

### Inputs, Secrets, and Repo Variables

Reusable workflow interface:

| Workflow               | Inputs                                                                                       | Required secrets       |
|------------------------|----------------------------------------------------------------------------------------------|------------------------|
| GitHub Workflow Lint   | None                                                                                         | None                   |
| Build Static Site      | `app_url`, `artifact_name` (default `dist`), `aws_region`                                    | None                   |
| Lighthouse Static Site | `artifact_name` (default `dist`)                                                             | None                   |
| Deploy Static Site     | `artifact_name` (default `dist`), `aws_region`, `cdk_stack_name`, `tag_prefix` (default `v`) | `AWS_DEPLOY_ROLE_ARN`  |

Repo-level values used by the live pipeline:

| Kind     | Name                                    | Required | Used by       | Purpose                                                       |
|----------|-----------------------------------------|----------|---------------|---------------------------------------------------------------|
| Secret   | `AWS_DEPLOY_ROLE_ARN`                   | Yes      | Deploy        | IAM role ARN used for GitHub OIDC authentication              |
| Variable | `AWS_REGION`                            | Yes      | Build, Deploy | AWS region used by the reusable workflows                     |
| Variable | `APP_URL`                               | Yes      | Build         | Public site URL (`https://ctrl-f.plus`) embedded in the build |
| Variable | `CDK_STACK_NAME`                        | Yes      | Deploy        | CloudFormation stack exposing `BucketName` / `DistributionId` |
| Variable | `NEXT_PUBLIC_CHROME_STORE_URL`          | No       | Build         | Chrome Web Store listing URL                                  |
| Variable | `NEXT_PUBLIC_GITHUB_EXT_URL`            | No       | Build         | GitHub extension repo URL                                     |
| Variable | `NEXT_PUBLIC_GITHUB_ORGANIZATION_URL`   | No       | Build         | GitHub organization URL                                       |
| Variable | `NEXT_PUBLIC_OPEN_COLLECTIVE_URL`       | No       | Build         | Open Collective URL                                           |
| Variable | `NEXT_PUBLIC_CONTACT_EMAIL`             | No       | Build         | Contact email                                                 |
| Variable | `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`        | No       | Build         | Cloudflare Web Analytics token                                |
| Variable | `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID`     | No       | Build         | CloudWatch RUM App Monitor ID                                 |
| Variable | `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID`   | No       | Build         | CloudWatch RUM Cognito Identity Pool ID                       |
| Variable | `NEXT_PUBLIC_SENTRY_DSN`                | No       | Build         | Sentry DSN                                                    |

[`../scripts/setup-github.sh`](../scripts/setup-github.sh) wires these values
from the CDK stack outputs and `.env.local` via the `gh` CLI.

Environment validation in the app:

- [`../src/clientEnv.ts`](../src/clientEnv.ts) validates all `NEXT_PUBLIC_*`
  values used by the build and client runtime.

### First Infrastructure Deploy

The GitHub Actions pipeline deploys static assets only. The first `cdk deploy`
stays manual and is documented here:

- Runbook: [`../infrastructure/INFRASTRUCTURE.md`](../infrastructure/INFRASTRUCTURE.md)
- Helper script: [`../scripts/initial-aws-deploy.sh`](../scripts/initial-aws-deploy.sh)
- Additional local env required for the first infrastructure deploy:
    - `AWS_REGION`
    - `CLOUDFRONT_CERTIFICATE_REGION`

### Unused Repo-Local Helpers

These files exist in the repo but are not used by the current workflows:

| Helper                 | File                                                                             | Notes                                                                                                  |
|------------------------|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Setup Node.js and pnpm | [`./actions/setup-node-pnpm/action.yml`](./actions/setup-node-pnpm/action.yml)   | Current workflows call `pnpm/action-setup@v4` and `actions/setup-node@v6` directly                     |
| Tag deployment         | [`./actions/tag-deployment/action.yml`](./actions/tag-deployment/action.yml)     | Supports configurable semver bumps, but the live deploy workflow performs an inline patch bump instead |
