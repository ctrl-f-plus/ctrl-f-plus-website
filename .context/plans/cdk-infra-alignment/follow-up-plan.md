# Follow-Up Improvements (Post Core CDK Alignment)

Non-blocking improvements to make after the core CDK infrastructure alignment is complete. None of these prevent the core infra from deploying or functioning — they improve CI/CD, developer experience, and security posture.

---

## 1. GitHub Actions Workflow Modernization

### 1a. Rename lint workflow

Delete `.github/workflows/lint-github-actions.yml`, create `.github/workflows/github-workflow-lint.yml` with updated naming conventions (job ID `github-workflow-lint`, workflow name `GitHub Workflow Lint`, bumped to `actions/checkout@v5`).

Update `.github/workflows/ci.yml` to reference the new filename and job ID:
- Line 26: `./.github/workflows/lint-github-actions.yml` → `./.github/workflows/github-workflow-lint.yml`
- Line 24: job key `actionlint` → `github-workflow-lint`
- Line 46: `needs: [actionlint, ...]` → `needs: [github-workflow-lint, ...]`

### 1b. Add concurrency block to `ci.yml`

The source adds a top-level concurrency group that cancels in-progress CI runs on non-master branches. This prevents wasted CI minutes when pushing multiple commits to a PR:

```yaml
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/master' }}
```

### 1c. Bump action versions

Several workflows use `actions/checkout@v4`, `actions/upload-artifact@v4`, `actions/download-artifact@v4`. The source has bumped these to `@v5`. Not urgent — `@v4` still works.

### 1d. OIDC debug step in deploy workflow

The source's `deploy-static-site.yml` adds a "Print OIDC subject" step that decodes the JWT token claims. Useful for debugging OIDC issues during initial setup. Consider wrapping in `if: runner.debug == '1'` to reduce log noise in normal runs.

### 1e. Input validation improvements in deploy workflow

The source adds validation for `cdk_stack_name` input (currently only `aws_region` is validated). Also fixes quoted parameter expansion in the tag version parsing:

```diff
-VERSION="${LATEST#${TAG_PREFIX}}"
+VERSION="${LATEST#"${TAG_PREFIX}"}"
```

This is a minor robustness fix for edge cases with special characters in prefixes.

---

## 2. GitHub Repository Variable Renames

### Current state

The variable naming flow works like this:

1. **`src/clientEnv.ts`** expects `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_AWS_REGION` (already correct)
2. **`build-static-site.yml`** maps workflow inputs to these `NEXT_PUBLIC_*` env vars at build time (already correct)
3. **`ci.yml`** maps GitHub repo variables to workflow inputs. Currently uses repo variable names `APP_URL` and `AWS_REGION`:
   ```yaml
   env:
     AWS_REGION: ${{ vars.AWS_REGION }}
     APP_URL: ${{ vars.APP_URL }}
   ```
   The source uses `vars.NEXT_PUBLIC_APP_URL` and `vars.NEXT_PUBLIC_AWS_REGION` for consistency.

### Recommended change

Rename the GitHub repository variables to match the `NEXT_PUBLIC_*` convention:
- `APP_URL` → `NEXT_PUBLIC_APP_URL`
- `AWS_REGION` → `NEXT_PUBLIC_AWS_REGION`

Update `ci.yml` to reference the new names. This must be coordinated: update the repo variables in GitHub Settings **before** merging the workflow change, otherwise CI will fail with empty values.

The source also removes the top-level `env:` block from `ci.yml` and passes values inline to each job. This is a structural cleanup — not functionally required.

---

## 3. `scripts/setup-github.sh` (new script)

Automates setting GitHub repo variables and secrets via the `gh` CLI after infrastructure deployment. This is entirely new code — no equivalent exists in either project.

**Design:**

```bash
scripts/setup-github.sh [--check|--apply]
```

- `--check`: read-only, shows current variable/secret state
- `--apply`: sets variables and secrets

**What it sets:**

| Type | Name | Source |
|------|------|--------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | CloudFormation output `GitHubActionsDeployRoleArn` |
| Variable | `NEXT_PUBLIC_APP_URL` | `https://ctrl-f.plus` |
| Variable | `NEXT_PUBLIC_AWS_REGION` | `us-east-2` |
| Variable | `CDK_STACK_NAME` | Derived from `infrastructure/cdk.json` |

Should also handle ctrl-f-plus-specific variables (`NEXT_PUBLIC_CHROME_STORE_URL`, `NEXT_PUBLIC_GITHUB_EXT_URL`, `NEXT_PUBLIC_GITHUB_ORGANIZATION_URL`, `NEXT_PUBLIC_OPEN_COLLECTIVE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`) — prompt user or read from `.env.local`.

**Error handling:** Verify `gh auth status`, verify stack is deployed before reading outputs, read `githubRepository` from `cdk.json` to target the correct repo.

---

## 4. `scripts/deploy-content.sh` (new script)

Manual content deployment script for use outside CI. Doesn't exist in ctrl-f-plus-website yet. Copy from source with:
- Remove `require_env_or_env_file_value NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME .env.local` (ctrl-f-plus doesn't use Cloudinary)
- Keep default `AWS_REGION=us-east-2`

The source's `read_stack_output` helper pattern in this script is cleaner than the inline `jq` in `initial-aws-deploy.sh` — consider backporting for consistency.

---

## 5. `scripts/cleanup.sh` improvements

The source uses a `find`-based approach with a verification step (31 lines) vs the current `rm -rf` approach (7 lines). The source version also handles `out/`, `cdk.out/`, and `.turbo/` directories.

Low priority — both approaches work. The source version is safer for monorepo contexts.

---

## 6. Lighthouse workflow and `@lhci/cli` dependency

### Current state

`lighthouse-static-site.yml` uses `npx @lhci/cli autorun` which auto-downloads the package at runtime. The source switches to `pnpm exec lhci autorun` which requires `@lhci/cli` to be a devDependency.

### Changes needed (if adopting source pattern)

1. Add `@lhci/cli@0.15.1` as a devDependency in root `package.json`
2. Add `pnpm install --frozen-lockfile` step to lighthouse workflow
3. Add `cache: pnpm` to `setup-node` step
4. Switch from `npx @lhci/cli autorun` to `pnpm exec lhci autorun`
5. Add `LHCI_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` to enable PR status checks

This is an improvement (deterministic version, cached installs, PR status checks) but not required — the current `npx` approach works.

---

## 7. CSP Header Tightening

`infrastructure/lib/constructs/static-site.ts` currently has CSP headers that include:
- `'unsafe-eval'` and `'unsafe-inline'` in `script-src`
- YouTube (`https://www.youtube.com`) and Cloudflare Insights (`https://static.cloudflareinsights.com`) as script sources
- `frame-src youtube.com www.youtube.com https://imgur.com/`
- `img-src * blob: data:` (allows all image origins)

These were carried over from benjamin-chavez.com. For ctrl-f-plus-website:
- `'unsafe-eval'` may not be needed (Next.js static export doesn't require it by default)
- YouTube/imgur frame sources may not apply unless the site embeds video/image content from these sources
- `img-src *` could be scoped to known origins

**Requires testing:** Build the site, serve it locally, and check the browser console for CSP violations after removing each directive. This is a security improvement worth doing but must be validated empirically.

---

## 8. Minor TypeScript config updates

### 8a. `infrastructure/tsconfig.json`

Add `"references": [{ "path": "./tsconfig.edge.json" }]` — enables project references between the main and edge TypeScript configs.

### 8b. `infrastructure/tsconfig.edge.json`

Add `"edge/**/*"` to the `include` array (currently has `"edge/**/*.ts"` and `"edge/**/*.d.ts"`).

Both are minor alignment items with no functional impact on the build.

---

## 9. Build-workflow-specific notes

When updating `build-static-site.yml`, preserve the ctrl-f-plus-specific env vars that are NOT in the source project:

```yaml
NEXT_PUBLIC_CHROME_STORE_URL: ${{ vars.NEXT_PUBLIC_CHROME_STORE_URL }}
NEXT_PUBLIC_GITHUB_EXT_URL: ${{ vars.NEXT_PUBLIC_GITHUB_EXT_URL }}
NEXT_PUBLIC_GITHUB_ORGANIZATION_URL: ${{ vars.NEXT_PUBLIC_GITHUB_ORGANIZATION_URL }}
NEXT_PUBLIC_OPEN_COLLECTIVE_URL: ${{ vars.NEXT_PUBLIC_OPEN_COLLECTIVE_URL }}
NEXT_PUBLIC_CONTACT_EMAIL: ${{ vars.NEXT_PUBLIC_CONTACT_EMAIL }}
```

Do NOT import the source's Cloudinary secret (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`) — ctrl-f-plus doesn't use Cloudinary.

Also: the current `build-static-site.yml` uses env var indirection for input validation (`INPUT_AWS_REGION` env var instead of direct `${{ inputs.aws_region }}` in shell). This is slightly safer against shell injection (even though inputs come from admin-controlled `vars.*`). Keep the current pattern.

---

## 10. Infrastructure documentation

The source project has `DEPLOYMENT.md`, `INFRASTRUCTURE.md`, and `INITIAL_DEPLOYMENT.md` in its `infrastructure/` directory. The target has none. Consider copying and adapting these — they document the CDK stack structure, deployment procedures, and initial setup requirements. Useful as onboarding docs.
