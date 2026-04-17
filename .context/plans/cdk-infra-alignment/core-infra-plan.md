# Core CDK Infrastructure Alignment

Align ctrl-f-plus-website's CDK infrastructure with the benjamin-chavez.com pattern: split the single `DnsStack` into
`HostedZoneStack` + `CertificateStack`, add the GitHub Actions OIDC deploy role to `StaticSiteStack`, and update the
deploy script for the new 3-stack flow.

**Source reference:** `/Users/benjaminchavez/Code/benjamin-chavez.com/infrastructure/`

## Assumptions

- **No existing ctrl-f.plus stacks.** CloudFormation has been checked in both `us-east-1` and `us-east-2` — no `ctrl-f.plus` / `CtrlFPlus*` stacks exist. (Only `BenjaminChavezCom-*` and `CDKToolkit` stacks are present.) Two preflight checks remain before deploying from scratch:
  1. Verify no pre-existing Route 53 hosted zone for `ctrl-f.plus` (could conflict with the new `HostedZoneStack`).
  2. Verify whether the GitHub OIDC provider for `token.actions.githubusercontent.com` already exists (see step 1 — if it exists, skip creation).
  If either check reveals existing resources, a targeted adjustment is needed rather than a full cutover plan.
- Domain `ctrl-f.plus` is registered on Namecheap.
- Deployment region: `us-east-2` (site stack). Certificate region: `us-east-1` (required by CloudFront).

---

## 1. OIDC Identity Provider Prerequisite

The source `static-site-stack.ts` calls `iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn()` — this is a **lookup
**, not a creation. It assumes an OIDC provider for `token.actions.githubusercontent.com` already exists in the AWS
account. On a clean-slate account it does not.

Before the site stack can deploy, the provider must exist. Check first, create only if missing:

```bash
# Check if the provider already exists
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
```

This should be added to `scripts/initial-aws-deploy.sh` before the site stack deploy step. Long-term, managing the OIDC provider as a CDK resource would be cleaner, but the scripted approach is pragmatic for a shared account-level resource.

---

## 2. Replace `DnsStack` with `HostedZoneStack` + `CertificateStack`

### 2a. Delete `infrastructure/lib/stacks/dns-stack.ts`

Currently combines hosted zone and certificate in one stack (44 lines). Being replaced by two focused stacks.

### 2b. Create `infrastructure/lib/stacks/hosted-zone-stack.ts`

Copy verbatim from source (`benjamin-chavez.com/infrastructure/lib/stacks/hosted-zone-stack.ts`, 32 lines). The file is
domain-agnostic — domain values flow from `envConfig`. It extracts the hosted zone portion of the current
`dns-stack.ts`, keeping the `RETAIN` removal policy and outputting `HostedZoneId` and `NameServers`.

### 2c. Create `infrastructure/lib/stacks/certificate-stack.ts`

Copy verbatim from source (`benjamin-chavez.com/infrastructure/lib/stacks/certificate-stack.ts`, 31 lines). Receives
`hostedZone` as a prop (from `HostedZoneStack`) and outputs `CertificateArn`.

---

## 3. Update `infrastructure/bin/app.ts`

Copy from source. Key changes vs current:

| Current                                    | New                                                                   |
|--------------------------------------------|-----------------------------------------------------------------------|
| Imports `DnsStack`                         | Imports `HostedZoneStack` + `CertificateStack`                        |
| Creates 2 stacks (`dnsStack`, `siteStack`) | Creates 3 stacks (`hostedZoneStack`, `certificateStack`, `siteStack`) |
| `appContext.repository`                    | `appContext.githubRepository`                                         |
| `siteStack.addDependency(dnsStack)`        | `siteStack.addDependency(certificateStack)`                           |
| No `githubRepository` prop on site stack   | Passes `githubRepository: appContext.githubRepository`                |

The `certificateStack`'s dependency on `hostedZoneStack` is implicit via the prop reference (
`hostedZone: hostedZoneStack.hostedZone`) — CDK resolves this automatically.

---

## 4. Update `infrastructure/lib/stacks/static-site-stack.ts`

Copy from source. Adds:

- `githubRepository: string` to `StaticSiteStackProps`
- `import * as iam from 'aws-cdk-lib/aws-iam'`
- ~70 lines creating a GitHub Actions OIDC deploy role:
    - Looks up existing OIDC provider via `fromOpenIdConnectProviderArn` (see step 1)
    - Creates `GitHubActionsDeployRole` with trust policy scoped to `repo:${githubRepository}:ref:refs/heads/master`
    - Grants: `cloudformation:DescribeStacks` (this stack only), S3 bucket read/write/delete,
      `cloudfront:CreateInvalidation` (this distribution only)
    - Adds `GitHubActionsDeployRoleArn` CfnOutput

Permissions are scoped to this stack, bucket, and distribution, with limited wildcard suffixes only where required by AWS ARN patterns (e.g., `stack-name/*` for CloudFormation, `bucket/*` for S3 objects).

---

## 5. Rename `repository` to `githubRepository` in CDK config

### 5a. `infrastructure/lib/config/types.ts`

Line 19: `readonly repository: string;` → `readonly githubRepository: string;`

### 5b. `infrastructure/lib/config/site-config.ts`

Line 152: `tryGetContext('repository')` → `tryGetContext('githubRepository')`
Line 163: `repository: readString(repository, 'repository')` →
`githubRepository: readString(githubRepository, 'githubRepository')`

### 5c. `infrastructure/cdk.json`

Line 22: `"repository": "ctrl-f-plus/ctrl-f-plus-website"` → `"githubRepository": "ctrl-f-plus/ctrl-f-plus-website"`

Additionally, hardcode `certificateRegion` to `"us-east-1"` (line 27, currently `"${CLOUDFRONT_CERTIFICATE_REGION}"`).
CloudFront always requires us-east-1 certificates — hardcoding eliminates one misconfiguration vector. Note: the
`CLOUDFRONT_CERTIFICATE_REGION` env var is still needed for CDK bootstrap in `initial-aws-deploy.sh` even after this
change.

---

## 6. Update `infrastructure/package.json`

Change the `deploy` script from `cdk deploy` to `cdk deploy --all`. The 3-stack architecture requires `--all` to deploy
all stacks in a single `pnpm deploy` invocation.

```diff
-"deploy": "pnpm run build:edge && cdk deploy"
+"deploy": "pnpm run build:edge && cdk deploy --all"
```

CDK dependency versions (`aws-cdk-lib: ^2.180.0`, `aws-cdk: ^2.180.0`) are identical between projects — no version
changes needed.

---

## 7. CloudFront edge function updates

### 7a. Replace `infrastructure/edge/cloudfront-runtime.d.ts`

The current file is a 16-line stub. The source has comprehensive type definitions (275 lines) covering the full
CloudFront Functions JS 2.0 runtime API. Copy from source.

### 7b. Cherry-pick fixes in `infrastructure/edge/viewer-request.handler.ts`

Three targeted fixes from the source:

1. **`hasFileExtension` (line 36):** `lastSegment.includes('.')` → `/\.\w+$/.test(lastSegment)` — current code
   false-positives on dotfiles like `.env` (no actual extension). The regex requires a dot followed by word characters
   at end of string.

2. **`serializeQuerystring` (line 53):** `for (const valueEntry of values)` → index-based `for (let i = 0; ...)`. This
   is a **runtime bug fix**: CloudFront Functions JS 2.0 does NOT support `for...of` on arrays. The current code will
   fail at runtime if a querystring has multi-value entries.

3. **`catch` clause (line 95):** `} catch {` → `} catch (_) {` — minor style alignment.

---

## 8. Revise `scripts/initial-aws-deploy.sh` for the 3-stack flow

Copy from source with these repo-specific adjustments:

**Remove:**

- Line 86: `require_env_file_value NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME .env.local` — ctrl-f-plus does not use Cloudinary.
  This is a stale requirement carried over from an earlier copy.

**Add:**

- `require_command dig` (after existing `require_command` calls)
- OIDC provider creation step before the site stack deploy (see step 1)

**Change the deploy flow from 2-stack to 3-stack:**

| Current                                                                                          | New                                                                                                                            |
|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `DNS_STACK_NAME="${STACK_NAME}-Dns"`                                                             | `HOSTED_ZONE_STACK_NAME="${STACK_NAME}-HostedZone"`, `CERT_STACK_NAME="${STACK_NAME}-Certificate"`                             |
| Deploy DnsStack → prompt for NS update → `aws acm wait certificate-validated` → deploy SiteStack | Deploy HostedZoneStack → prompt for NS update → `dig`-based DNS verification loop → deploy CertificateStack → deploy SiteStack |

The source's DNS verification loop (`normalize_ns()` + polling `dig +short NS`) is an improvement over the current
`aws acm wait certificate-validated` which can hang for 60 minutes with no feedback and doesn't verify that DNS
delegation actually happened.

**Namecheap note:** The script is registrar-agnostic — it prints NS records and prompts "Update your domain registrar."
No GoDaddy-specific references exist in the script code. During the pause, update nameservers in Namecheap: Domain
List → Manage → Nameservers → Custom DNS.

---

## Files NOT part of this core migration

The following files are already effectively aligned between projects and do not need changes:

- **`infrastructure/lib/constructs/static-site.ts`** — verified identical between projects (207 lines). CSP headers,
  CloudFront distribution config, S3 bucket, Route 53 records are all the same. (CSP tightening is a separate follow-up
  concern.)
- **`infrastructure/lib/constructs/cloudfront-routing.ts`** — verified identical (45 lines).
- **`infrastructure/assets/cloudfront/redirects.json`** — keep the current empty `{"data": []}`. The source has
  benjamin-chavez.com-specific redirects — do NOT copy those.

Other files that need repo-specific review but are **not blockers for the CDK structural alignment**:

- Edge assets and redirect data (repo-specific content)
- GitHub Actions workflows (follow-up plan)
- Repo variables and secrets (follow-up plan)
- Infrastructure documentation (DEPLOYMENT.md, INFRASTRUCTURE.md, INITIAL_DEPLOYMENT.md exist in source but not target)
- `tsconfig.json` references field, `tsconfig.edge.json` include pattern (minor, follow-up)

---

## Verification

### Pre-deploy (local)

1. `cd infrastructure && pnpm install` — install deps after package.json changes
2. `pnpm run build:edge` — verify edge function compiles with new type defs
3. `npx cdk synth` — should produce 3 CloudFormation templates: `*-HostedZone`, `*-Certificate`, `*-Prod`

### Deploy (via `scripts/initial-aws-deploy.sh --apply`)

4. HostedZone stack deploys → script prints NS records
5. Update Namecheap DNS → script's `dig` loop verifies propagation
6. Certificate stack deploys → ACM cert validates via DNS
7. Site stack deploys → S3 bucket, CloudFront distribution, OIDC role created
8. Static site built and synced to S3

### Post-deploy

9. `curl -I https://ctrl-f.plus` — HTTPS works, security headers present
10. `curl -I https://www.ctrl-f.plus` — www alternate domain works
11. `aws iam get-role --role-name ctrl-f-plus-website-prod-github-actions-deploy` — OIDC role exists

### CI verification (requires one manual step)

Before triggering a CI run, set the GitHub secret so the deploy workflow can assume the OIDC role:

```bash
# Read the role ARN from the deployed site stack
ROLE_ARN=$(aws cloudformation describe-stacks \
  --stack-name CtrlFPlusWebsite-Prod \
  --region us-east-2 \
  --query 'Stacks[0].Outputs[?OutputKey==`GitHubActionsDeployRoleArn`].OutputValue' \
  --output text)

gh secret set AWS_DEPLOY_ROLE_ARN --body "$ROLE_ARN" --repo ctrl-f-plus/ctrl-f-plus-website
```

12. Trigger a `workflow_dispatch` CI run to verify the OIDC deploy pipeline end-to-end

### Rollback

- **HostedZone deployed, cert fails:** `cdk destroy CtrlFPlusWebsite-Prod-Certificate`. HostedZone has `RETAIN` policy
  and survives.
- **Site stack fails:** `cdk destroy CtrlFPlusWebsite-Prod`. Certificate and HostedZone survive.
- **Nuclear:** `cdk destroy --all`. Resources with `RETAIN` survive (manual console cleanup needed for hosted zone and
  S3 bucket).
