# CloudFront Redirect Routing in This Repo

This document reflects the current redirect implementation in `infrastructure/`. It is a source-of-truth walkthrough for how redirects, clean URL rewrites, and CloudFront wiring work in the code that exists today.

## Overview

The redirect flow is split across four places:

| Part | Path | Responsibility |
|------|------|----------------|
| Redirect data | `infrastructure/assets/cloudfront/redirects.json` | Stores redirect mappings as CloudFront KeyValueStore import data |
| Edge source | `infrastructure/edge/viewer-request.handler.ts` | Looks up redirects, preserves query strings, and rewrites clean URLs to `index.html` |
| Edge build output | `infrastructure/dist/cloudfront/viewer-request.handler.js` | Compiled JavaScript artifact consumed by the CDK app |
| CDK wiring | `infrastructure/lib/constructs/cloudfront-routing.ts` | Creates the KeyValueStore and CloudFront Function from the two assets above |

The main site construct in `infrastructure/lib/constructs/static-site.ts` attaches the viewer-request function to the distribution and creates Route 53 records for both the apex domain and alternate domain names.

## Current Request Flow

For each incoming request, the viewer-request function in `infrastructure/edge/viewer-request.handler.ts` does this:

1. Reads `request.uri`.
2. Tries to fetch a redirect target from `cf.kvs()` using the full request URI as the key.
3. If a redirect exists, returns a `301` response and preserves the original query string.
4. If no redirect exists, rewrites clean URLs:
   - `/foo/` becomes `/foo/index.html`
   - `/foo` becomes `/foo/index.html`
   - asset-like paths such as `/img/logo.png` are left alone

That means redirect behavior and static-file routing both happen in one place, while the actual redirect entries stay in data.

## Redirect Data Format

The redirect source file is `infrastructure/assets/cloudfront/redirects.json`.

Current shape:

```json
{
  "data": [
    {
      "key": "/blog/step-by-step-guide-setting-up-expressjs-typescript-web-app",
      "value": "/blog/creating-a-typescript-express.js-web-application-with-es6-step-by-step-guide/"
    },
    {
      "key": "/downloads/epay-mailer",
      "value": "/downloads/Estimated%20Tax%20Payment%20Mailer.zip"
    }
  ]
}
```

Rules the current code expects:

- `data` must be an array.
- Each entry must have `key` and `value`.
- The key is the incoming request URI.
- The value is the redirect destination returned by CloudFront.

## How CDK Wires It Together

`infrastructure/lib/constructs/cloudfront-routing.ts` owns the redirect-specific AWS resources:

- `cloudfront.KeyValueStore`
  - Created from `redirectsAssetPath`
- `cloudfront.Function`
  - Created from `compiledEdgeAssetPath`
  - Uses `JS_2_0`
  - Receives the KeyValueStore instance

`infrastructure/lib/constructs/static-site.ts` then uses that construct to:

- attach the viewer-request function to the default CloudFront behavior
- keep response-header policy logic in the site construct
- create apex and alternate Route 53 `A` and `AAAA` records

## Build and Verification

The edge handler is authored in TypeScript and compiled with `infrastructure/tsconfig.edge.json`.

Current compiler settings that matter:

- `rootDir`: `./edge`
- `outDir`: `./dist/cloudfront`

Useful commands:

```bash
pnpm --dir infrastructure run build:edge
pnpm --dir infrastructure run build
pnpm --dir infrastructure run synth
```

Quick verification steps:

1. Rebuild the edge handler.

```bash
pnpm --dir infrastructure run build:edge
```

2. Confirm the compiled asset exists.

```bash
ls -la infrastructure/dist/cloudfront/viewer-request.handler.js
```

3. Confirm the CDK app can still synthesize.

```bash
pnpm --dir infrastructure run synth
```

## Changing Redirects Safely

Use this rule of thumb:

- Changing only redirect destinations:
  - edit `infrastructure/assets/cloudfront/redirects.json`
- Changing redirect behavior or clean URL rewrite logic:
  - edit `infrastructure/edge/viewer-request.handler.ts`
  - rebuild the edge handler

If you change either asset path, update `infrastructure/lib/config/site-config.ts`, because that file resolves the absolute paths used by the CDK app.

## Notes

- `infrastructure/dist/cloudfront/viewer-request.handler.js` is generated output. The TypeScript source of truth is `infrastructure/edge/viewer-request.handler.ts`.
- The current redirect implementation depends on the CloudFront KeyValueStore import file under `infrastructure/assets/cloudfront/redirects.json`; there is no longer a source-controlled `infrastructure/cloudfront/redirects.json`.
- The current site construct uses `CloudFrontRouting`; redirect wiring is no longer embedded directly inside a monolithic `static-site-construct.ts`.
