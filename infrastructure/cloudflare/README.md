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
3. Fill in the three `FILLED_IN_PHASE_5` placeholders in
   `production.auto.tfvars` and commit the result.
4. `terraform -chdir=infrastructure/cloudflare init`
5. `terraform -chdir=infrastructure/cloudflare plan`
6. `terraform -chdir=infrastructure/cloudflare apply`

Validation without any credential runs `init -backend=false` followed by
`validate`, which is what CI does on every pull request.

## What this root owns

The zone, its SSL and TLS settings, the apex and www DNS records, the rate
limit ruleset that backstops the OTP endpoint, the import of the existing Web
Analytics site, and the two release API tokens.

## What this root does not own

Workers, their assets, their secrets, their Routes, and their Custom Domains.
Those belong to wrangler, so the API hostname record is created by the API
Worker's Custom Domain and is never declared here.

## Values the site cutover changes

`site_dns_target` moves from the CloudFront distribution hostname to the site
Worker origin hostname, and `site_dns_proxied` turns on. Both live in
`production.auto.tfvars` so the change is a reviewable diff.
