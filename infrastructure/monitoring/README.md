# Monitoring & Analytics

Setup docs for the monitoring/analytics integrations the site supports. Each
integration is gated by an env var — if the var isn't set, the integration
silently no-ops, so it's safe to enable them one at a time.

| Integration                             | Doc                                                  | Script                                                                                 | Env var(s)                                                                 |
|-----------------------------------------|------------------------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| CloudWatch RUM (real-user perf)         | [cloudwatch-rum.md](./cloudwatch-rum.md)             | [`scripts/setup-cloudwatch-rum.sh`](../../scripts/setup-cloudwatch-rum.sh)             | `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID`, `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` |
| Cloudflare Web Analytics (page views)   | [cloudflare-analytics.md](./cloudflare-analytics.md) | [`scripts/setup-cloudflare-analytics.sh`](../../scripts/setup-cloudflare-analytics.sh) | `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`                                           |
| Sentry (errors)                         | (manual — see below)                                 | —                                                                                      | `NEXT_PUBLIC_SENTRY_DSN`                                                   |
| Lighthouse CI (build-time perf budgets) | (already wired)                                      | —                                                                                      | none                                                                       |

## Sentry (manual, ~5 min)

1. Create a Browser JavaScript project at https://sentry.io.
2. Project Settings → **Client Keys (DSN)** → copy the DSN URL.
3. Set the env var:
   ```bash
   echo 'NEXT_PUBLIC_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<id>' >> .env.local
   gh variable set NEXT_PUBLIC_SENTRY_DSN --body 'https://...'
   ```
4. The init at `src/components/utility/sentry-init.tsx` runs on mount when the
   DSN is present. `tracesSampleRate` is currently `0` — bump to `0.1` if you
   want transaction sampling.

## Lighthouse CI (no setup needed)

Runs on every PR via `.github/workflows/lighthouse-static-site.yml`. Asserts
performance, accessibility, best-practices, and SEO scores ≥ 0.9 across
`/` and `/blog`. Reports upload to Lighthouse's `temporary-public-storage` —
the link is printed in CI logs and posted as a PR status check (via the
`LHCI_GITHUB_TOKEN` env var, which is auto-injected from `secrets.GITHUB_TOKEN`).

Tune budgets in `.lighthouserc.js`.