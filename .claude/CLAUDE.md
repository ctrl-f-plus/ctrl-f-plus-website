# CLAUDE.md

Audio Arkive — full-stack e-commerce marketplace for music producers. Turborepo monorepo, pnpm@10.32.1, Node >=22.14.0 <23.

- **Frontend**: Next.js 16 (App Router), React 19, Redux Toolkit, Tailwind CSS
- **Backend**: Express.js, Knex.js (migrations) / Kysely (queries), Auth0, Stripe
- **Local infra**: LocalStack (S3 + SQS), PostgreSQL, Docker

## Repository Structure

```
apps/
  client/            # Next.js frontend (port 3000)
  server/            # Express API (port 5000)
  api/               # Unused — only has a knexfile
  nest-server*/      # Excluded from workspace
  ts-starter/        # Excluded from workspace
  lambdas/           # Docker configs only — no source code
packages/            # auth, catalyst-ui-kit, eslint-config, logger, shared-types,
                     # stripe-listener, tailwind-config, types2, ui, utils
infrastructure/      # Terraform
scripts/             # DB, S3, migration utilities
```

## Commands

### Root-level (runs via Turborepo)
```bash
pnpm dev                  # Start client + server (auto-starts LocalStack)
pnpm dev:clean            # Force-recreate LocalStack + server resets DB
pnpm build                # Build all packages
pnpm lint                 # Lint all packages
pnpm typecheck            # Type-check all packages
pnpm test                 # Run all tests (ensures LocalStack is up)
pnpm test:e2e             # Playwright E2E tests (client only)
pnpm format               # Prettier format all .ts/.tsx/.md files
```

### Server-specific (`pnpm --filter server <script>`)
```bash
pnpm test                 # build:database → drop/recreate test DB → vitest run --typecheck
pnpm test:unit            # Unit tests only (no DB reset)
pnpm test:integration     # Integration tests only (resets DB)
pnpm dev:clean            # Drop dev DB → recreate → migrate → seed → start dev server
pnpm db:migrate           # Run knex migrations + update generated types
pnpm dlq                  # Manage SQS dead-letter queue
```

### Terraform (from root)
```bash
pnpm tfi / tfp / tfa / tfd   # init / plan / apply / destroy (uses .tfvars)
```

## Dev Requirements

- Docker (LocalStack: local S3 + SQS on port 4566, s3-ui on port 8080)
- PostgreSQL
- Stripe CLI (for webhook testing)
- Env vars: see `turbo.json` `globalEnv` for the full list

## Gotchas

- **Server `pnpm test` drops and recreates the test DB** (`audio_archive_test`) every run. It also runs `build:database` first to generate types from the schema.
- **`build:database` must succeed before server tests run** — it compiles `tsconfig.database.json` and copies assets to `dist/`. If you change migration files, this step must re-run.
- **Server integration tests use Testcontainers** for PostgreSQL — Docker must be running.
- **Stripe webhook secret is ephemeral** — it changes every `pnpm dev` restart. Check the Stripe CLI output for the current secret.
- **`pnpm dev` auto-starts LocalStack** via `docker compose -f docker-compose.local.yml up -d`. If Docker isn't running, `pnpm dev` will fail at the `elasticmq:ensure` step.
- **Server uses `esbuild-register`** for runtime TS execution (not `ts-node`), both in dev and test scripts.