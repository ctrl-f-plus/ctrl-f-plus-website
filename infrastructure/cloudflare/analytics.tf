# infrastructure/cloudflare/analytics.tf

# A fresh site in the company account (ruling R17). Its site_token replaces the
# beacon token in NEXT_PUBLIC_CF_ANALYTICS_TOKEN; the old site stays untouched.
resource "cloudflare_web_analytics_site" "site" {
  account_id   = var.cloudflare_account_id
  host         = var.zone_name
  auto_install = false
}
