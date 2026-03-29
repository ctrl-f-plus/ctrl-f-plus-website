# Current Infrastructure Package Layout

This document reflects the infrastructure package as it exists today in `infrastructure/`. It describes the current module boundaries, environment resolution, generated assets, and verification commands instead of the older multi-step refactor that produced this layout.

## Overview

The infrastructure package is organized around three layers:

| Layer | Path | Responsibility |
|------|------|----------------|
| Entry point | `infrastructure/bin/app.ts` | Loads CDK context, resolves the target environment, and instantiates the stack |
| Configuration | `infrastructure/lib/config/*` | Defines environment types and resolves absolute asset paths |
| Deployment and constructs | `infrastructure/lib/stacks/*`, `infrastructure/lib/constructs/*` | Creates the stack, site resources, CloudFront routing, and outputs |

Generated artifacts live under `infrastructure/dist/`. Source-controlled assets live under `infrastructure/assets/` and `infrastructure/edge/`.

## Current File Layout

| Path | What it owns |
|------|---------------|
| `infrastructure/bin/app.ts` | CDK app bootstrap and environment selection |
| `infrastructure/cdk.json` | CDK app command, watch settings, and the current `prod` context |
| `infrastructure/lib/config/types.ts` | `EnvironmentName`, `EnvironmentConfig`, and resolved config types |
| `infrastructure/lib/config/site-config.ts` | Context parsing and absolute path resolution for edge and redirect assets |
| `infrastructure/lib/stacks/static-site-stack.ts` | Deployment unit and CloudFormation outputs |
| `infrastructure/lib/constructs/static-site.ts` | S3 bucket, certificate, distribution, Route 53 records, and response headers |
| `infrastructure/lib/constructs/cloudfront-routing.ts` | CloudFront KeyValueStore plus viewer-request function wiring |
| `infrastructure/assets/cloudfront/redirects.json` | Source-controlled redirect import data |
| `infrastructure/edge/viewer-request.handler.ts` | TypeScript source for the viewer-request function |
| `infrastructure/dist/cloudfront/viewer-request.handler.js` | Generated JavaScript asset consumed by the CDK app |

## Environment Model

The current environment model is intentionally small:

- `EnvironmentName` is `prod` only.
- `infrastructure/cdk.json` defines one environment:
  - `envName`: `prod`
  - `region`: `us-east-1`
  - `domainName`: `benjamin-chavez.com`
  - `alternateDomainNames`: `www.benjamin-chavez.com`
- `infrastructure/bin/app.ts` resolves the target environment from:
  - `--context env=...`
  - or `CDK_ENV`
  - otherwise defaults to `prod`

`infrastructure/lib/config/site-config.ts` also resolves the two file paths the CDK app needs at deploy time:

- `compiledEdgeAssetPath`
  - `infrastructure/dist/cloudfront/viewer-request.handler.js`
- `redirectsAssetPath`
  - `infrastructure/assets/cloudfront/redirects.json`

## Stack and Construct Boundaries

The current split is:

- `StaticSiteStack`
  - owns the deployment unit
  - instantiates `StaticSite`
  - publishes CloudFormation outputs
- `StaticSite`
  - owns the bucket, hosted zone, certificate, distribution, response headers policy, and DNS records
  - delegates redirect-specific wiring to `CloudFrontRouting`
- `CloudFrontRouting`
  - creates the `cloudfront.KeyValueStore`
  - creates the `cloudfront.Function`
  - binds the compiled handler asset to the redirect store

Current stack outputs in `infrastructure/lib/stacks/static-site-stack.ts`:

- `BucketName`
- `DistributionId`
- `DistributionDomainName`
- `NameServers`

The GitHub Actions deploy workflow currently consumes `BucketName` and `DistributionId` when publishing the static site.

## Build and Deploy Commands

`infrastructure/package.json` currently defines:

```bash
pnpm --dir infrastructure run build
pnpm --dir infrastructure run build:edge
pnpm --dir infrastructure run synth
pnpm --dir infrastructure run diff
pnpm --dir infrastructure run deploy
```

What each command does:

| Command | Behavior |
|---------|----------|
| `build:edge` | Compiles `infrastructure/edge/**/*.ts` into `infrastructure/dist/cloudfront/` |
| `build` | Runs `build:edge` and then compiles the infrastructure TypeScript sources |
| `synth` | Rebuilds the edge handler and synthesizes the CloudFormation template |
| `diff` | Rebuilds the edge handler and shows the CloudFormation diff |
| `deploy` | Rebuilds the edge handler and runs `cdk deploy` |

## Verification Checklist

After changing the infrastructure package, the current repo supports this verification flow:

1. Rebuild the edge handler.

```bash
pnpm --dir infrastructure run build:edge
```

2. Confirm the compiled asset exists.

```bash
ls -la infrastructure/dist/cloudfront/viewer-request.handler.js
```

3. Rebuild the infrastructure package.

```bash
pnpm --dir infrastructure run build
```

4. Synthesize the stack.

```bash
pnpm --dir infrastructure run synth
```

5. Inspect the planned infrastructure change set when needed.

```bash
pnpm --dir infrastructure run diff
```

## Notes

- `infrastructure/dist/` is generated output. Source-of-truth code lives under `infrastructure/bin/`, `infrastructure/lib/`, `infrastructure/assets/`, and `infrastructure/edge/`.
- The current redirect implementation is documented separately in `docs/tutorials/2026-03-28-cloudfront-redirect-refactor_codex.md`.
- `infrastructure/cdk.json` and `.github/workflows/ci.yml` now both use `BenjaminChavezDotCom` as the stack name consumed by deploy-time CloudFormation lookups.
