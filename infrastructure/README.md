# Infrastructure

Infrastructure as code for `ctrl-f.plus`, split into one root per provider.
Each root has its own tooling, state and README. The shared monitoring docs sit
beside them.

| Directory                               | Tool                    | Owns                                                                                                                              | Run                                                                |
|-----------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| [`aws/`](./aws/README.md)               | AWS CDK                 | Route 53 hosted zone, ACM certificate, S3 bucket, CloudFront distribution and OAC, CloudFront function, GitHub OIDC deploy role   | `pnpm --dir infrastructure/aws run <build\|synth\|diff\|deploy>`   |
| [`cloudflare/`](./cloudflare/README.md) | Terraform (HCP backend) | Cloudflare zone, DNS records, TLS settings, OTP rate limiting, Web Analytics site import, release API tokens                       | `terraform -chdir=infrastructure/cloudflare <init\|plan\|apply>`   |
| [`monitoring/`](./monitoring/README.md) | Docs only               | Setup notes for CloudWatch RUM, Cloudflare Web Analytics, Sentry and Lighthouse CI                                                | See each doc                                                       |

The AWS root is live. The Cloudflare root is being bootstrapped ahead of the DNS
cutover; its README gives the order.

## Helper scripts

The provisioning and deploy scripts live in [`../scripts/`](../scripts) and run
from the repo root. They read the app name, domain and repository from
`aws/cdk.json`.

- `scripts/initial-aws-deploy.sh`: first-time bring-up of all three CDK stacks
- `scripts/deploy-content.sh`: content-only deploy to S3 plus a CloudFront invalidation
- `scripts/setup-github.sh`: writes the GitHub variables and secrets CI expects
- `scripts/setup-cloudwatch-rum.sh`: provisions CloudWatch RUM
- `scripts/setup-cloudflare-analytics.sh`: creates the Web Analytics site that Terraform later imports
- `scripts/cleanup.sh`: removes build output, including `aws/cdk.out` and `aws/dist`

## CI

`.github/workflows/cloudflare-infra.yml` validates the Terraform root on every
pull request that touches it and can run a plan on manual dispatch. The CDK root
has no CI job; `cdk deploy` stays a manual step, as
[`aws/README.md`](./aws/README.md) describes.
