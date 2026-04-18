# CloudWatch RUM Setup

CloudWatch RUM (Real-User Monitoring) collects performance and error data from
real visitors' browsers. It is **not** in the CDK stack — it's provisioned
separately because the resources (Cognito identity pool, IAM role, RUM monitor)
are typically created once and re-used.

The site reads two env vars at runtime
(`src/components/utility/cloudwatch-rum.tsx`); when both are set the
`aws-rum-web` SDK initializes and starts sending events:

| Env var                               | Source                                                          |
|---------------------------------------|-----------------------------------------------------------------|
| `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID`   | RUM monitor ID (UUID-like, output of `aws rum get-app-monitor`) |
| `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID` | Cognito identity pool ID (`<region>:<uuid>`)                    |
| `NEXT_PUBLIC_AWS_REGION`              | Region the monitor lives in (defaults to `us-east-2`)           |

## Recommended: run the script

```bash
# Verify what would be created
scripts/setup-cloudwatch-rum.sh --check

# Provision (idempotent — re-uses any resources whose names already exist)
scripts/setup-cloudwatch-rum.sh --apply

# Provision AND write to .env.local in one go
scripts/setup-cloudwatch-rum.sh --apply --write-env
```

The script:

1. Creates a Cognito identity pool named `<appName>-rum`
   (`ctrl-f-plus-website-rum`).
2. Creates an IAM role with a narrowly-scoped `rum:PutRumEvents` policy and
   wires it as the pool's unauthenticated identity.
3. Creates a RUM app monitor named `<appName>` for the configured domain.
4. Prints the env-var values you need to set.

It reads `appName` and `prod.domainName` from `infrastructure/cdk.json`, so the
created resources stay in sync with what CDK deploys.

## Manual setup (if you'd rather do it in the AWS Console)

1. **Cognito** → Federated Identities → Create new identity pool
    - Pool name: `ctrl-f-plus-website-rum`
    - Enable access to unauthenticated identities: **yes**
    - On the IAM-roles screen, accept the auto-generated unauth role for now;
      we'll attach a custom policy below.

2. **IAM** → Roles → find the unauth role just created → attach an inline
   policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       { "Effect": "Allow", "Action": "rum:PutRumEvents", "Resource": "*" }
     ]
   }
   ```

3. **CloudWatch** → RUM → Add app monitor
    - App monitor name: `ctrl-f-plus-website`
    - Application domain: `ctrl-f.plus`
    - Data collection: include performance, errors, HTTP requests
    - Authorization: choose the Cognito identity pool from step 1

4. After creation, copy:
    - **App monitor ID** (shown on the monitor's overview page) →
      `NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID`
    - **Identity pool ID** (Cognito → Federated Identities → click pool → Edit
      identity pool → Identity pool ID) → `NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID`

## Wire the env vars

```bash
# Local dev
echo 'NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID=<id>' >> .env.local
echo 'NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID=<id>' >> .env.local

# CI / deployed builds (the build-static-site.yml workflow already passes
# these through, you just need them set as repo variables)
gh variable set NEXT_PUBLIC_CW_RUM_APP_MONITOR_ID --body '<id>'
gh variable set NEXT_PUBLIC_CW_RUM_IDENTITY_POOL_ID --body '<id>'
```

## Verifying it works

1. Restart `pnpm dev`.
2. Open the site at `http://localhost:3000` in a browser.
3. DevTools → Network → filter for `dataplane.rum.<region>.amazonaws.com` —
   you should see a `PutRumEvents` request after a few seconds.
4. AWS Console → CloudWatch → RUM → `ctrl-f-plus-website` → metrics start
   appearing within ~2 minutes.

If no requests appear, check the browser console for `[CloudWatch RUM] Failed
to initialize` warnings — usually means the identity pool's unauth role isn't
attached or doesn't have `rum:PutRumEvents`.

## Tearing it down (if you ever need to)

```bash
aws rum delete-app-monitor --name ctrl-f-plus-website
aws iam delete-role-policy --role-name CtrlfpluswebsiteRumUnauth --policy-name PutRumEvents
aws iam delete-role --role-name CtrlfpluswebsiteRumUnauth
aws cognito-identity delete-identity-pool --identity-pool-id <pool-id>
```

## Cost

CloudWatch RUM bills per event. At 1.0 sample rate (every session) for a
low-traffic site (~hundreds of sessions/month) the cost is typically under
$1/month. For higher-traffic sites, lower `sessionSampleRate` in
`scripts/setup-cloudwatch-rum.sh` (currently `1`).