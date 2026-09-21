# Cloudflare zone Terraform root

One Terraform root for everything zone-level on Cloudflare. It creates nothing
on its own: `plan` and `apply` are run by the owner during the DNS onboarding
phase.

## Bootstrap order

1. State lives in the HCP Terraform workspace `ctrl-f-plus-cloudflare` of the
   `Ctrl-F-Plus` organization, in local execution mode, named in `backend.tf`.
   Run `terraform login` once on a new machine.
2. Create a Cloudflare account API token for infrastructure use and export it
   as `CLOUDFLARE_API_TOKEN`. Export the HCP workspace token as
   `TF_TOKEN_app_terraform_io`.
3. Set `cloudflare_account_id` in `production.auto.tfvars` to the company
   account's id and commit the result.
4. `terraform -chdir=infrastructure/cloudflare init`
5. `terraform -chdir=infrastructure/cloudflare plan`
6. `terraform -chdir=infrastructure/cloudflare apply`

Validation without any credential runs `init -backend=false` followed by
`validate`, which is what CI does on every pull request.

## What this root owns

The zone, its SSL and TLS settings, the apex and www DNS records, the rate
limit ruleset that backstops the OTP endpoint, a fresh Web Analytics site
whose token the website embeds, and the two release API tokens.

## What this root does not own

Workers, their assets, their secrets, their Routes, and their Custom Domains.
Those belong to wrangler, so the API hostname record is created by the API
Worker's Custom Domain and is never declared here.

## Values the site cutover changes

`site_dns_target` is now the Worker origin `worker-origin.ctrl-f.plus` and
`site_dns_proxied` is on, so a Worker route answers the apex and www hostnames
before any origin is reached. Both values live in `production.auto.tfvars`, so
either direction is a reviewable diff.

## Rolling back to CloudFront

Both values must change together: a DNS-only record that still points at the
Worker origin serves nothing, because `100::` has no origin behind it. From a
checkout with the infrastructure token in the environment:

```bash
terraform -chdir=infrastructure/cloudflare apply -var site_dns_target=d3l393pse9nhk2.cloudfront.net -var site_dns_proxied=false
START=$(date +%s); until curl -sI https://ctrl-f.plus/ | grep -qi '^via'; do sleep 10; done; echo "CloudFront answering after $(( $(date +%s) - START )) seconds"
```

CloudFront adds a `via` header and the Worker does not, which is what the loop
waits for. Resolvers keep the previous answer for up to 300 seconds; the drill
on 2026-09-21 measured 244 seconds out and 81 seconds back. To return, apply
the committed values and wait for the `via` header to disappear:

```bash
terraform -chdir=infrastructure/cloudflare apply
START=$(date +%s); until ! curl -sI https://ctrl-f.plus/ | grep -qi '^via'; do sleep 10; done; echo "Worker answering after $(( $(date +%s) - START )) seconds"
```

The `-var` form leaves the committed file alone, which suits a drill or a short
outage. A rollback that must survive the next apply belongs in
`production.auto.tfvars` as a committed change. The lever exists only while the
CloudFront distribution does; the AWS retirement phase deletes it.
