# Cloudflare Web Analytics Setup

Cloudflare Web Analytics is a free, privacy-friendly RUM service. The site
loads its beacon script via a Next.js `<Script>` tag at
`src/app/layout.tsx:104-107` whenever the env var is set:

| Env var                          | Source                                             |
|----------------------------------|----------------------------------------------------|
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | The site's `site_tag` (a short alphanumeric token) |

The CSP at `infrastructure/lib/constructs/static-site.ts` already permits
`https://static.cloudflareinsights.com` in `script-src` and `connect-src`, so
no infra changes are needed when enabling this.

## Recommended: run the script

Prerequisites:

- A Cloudflare API token with permission **Account · Web Analytics · Edit**
  (create at https://dash.cloudflare.com/profile/api-tokens).
- Your Cloudflare **Account ID** — visible in the right sidebar of any zone
  in the dash, or via the helper below.

```bash
export CF_API_TOKEN='<token>'

# (optional) Discover your account ID if you don't know it
scripts/setup-cloudflare-analytics.sh --whoami

export CF_ACCOUNT_ID='<id>'

# Verify what would be created
scripts/setup-cloudflare-analytics.sh --check

# Provision (idempotent — re-uses an existing site for the same host)
scripts/setup-cloudflare-analytics.sh --apply

# Provision AND write to .env.local in one go
scripts/setup-cloudflare-analytics.sh --apply --write-env
```

The script reads the host from `infrastructure/cdk.json`
(`prod.domainName` → `ctrl-f.plus`), calls the Cloudflare RUM API to create or
look up the site, and prints the `site_tag` value.

## Manual setup (if you'd rather do it in the Cloudflare dashboard)

1. https://dash.cloudflare.com → **Analytics & Logs** → **Web Analytics** →
   **Add a site**.
2. Hostname: `ctrl-f.plus`.
3. Choose **JS snippet** (NOT "automatic via CF proxy" — the site is on
   CloudFront, not Cloudflare's proxy).
4. Cloudflare shows a `<script defer src=… data-cf-beacon='{"token":"<X>"}'>`
   snippet. Copy the value of `token` — that's your `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`.
5. Skip the "place this snippet in your HTML" step — `src/app/layout.tsx`
   already does this when the env var is set.

## Wire the env var

```bash
# Local dev
echo 'NEXT_PUBLIC_CF_ANALYTICS_TOKEN=<site_tag>' >> .env.local

# CI / deployed builds (build-static-site.yml already threads this through)
gh variable set NEXT_PUBLIC_CF_ANALYTICS_TOKEN --body '<site_tag>'
```

## Verifying it works

1. Restart `pnpm dev`.
2. Open the site at `http://localhost:3000` (or your deployed URL).
3. DevTools → Network → filter for `cloudflareinsights.com` — you should see:
    - `beacon.min.js` (the loader)
    - one `POST` to `cloudflareinsights.com/cdn-cgi/rum?...` per page view
4. https://dash.cloudflare.com → **Analytics** → **Web Analytics** →
   `ctrl-f.plus` — events appear within a few minutes (real visitors, not
   localhost — Cloudflare filters out development traffic by default).

If you see no beacon script in the DOM, confirm `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`
is set in the environment your build was run with (it's read at build time
via `clientEnv.ts`).

## Tearing it down

Cloudflare dash → Web Analytics → ⋯ menu next to the site → **Delete site**.
There is currently no destructive `--delete` mode in the script.

## Cost

Free for any traffic volume. No CC required.