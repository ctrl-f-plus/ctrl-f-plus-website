# infrastructure/cloudflare/security.tf

resource "cloudflare_ruleset" "api_otp_burst" {
  zone_id = cloudflare_zone.site.id
  kind    = "zone"
  phase   = "http_ratelimit"
  name    = "API OTP burst limit"

  rules = [{
    expression  = "(http.request.uri.path eq \"/v1/auth/otp\")"
    action      = "block"
    description = "Burst backstop for the OTP endpoint; the Worker enforces the real budgets"

    ratelimit = {
      characteristics     = ["cf.colo.id", "ip.src"]
      period              = 10
      requests_per_period = 10
      mitigation_timeout  = 10
    }
  }]
}
