# infrastructure/cloudflare/dns.tf

# The ACM validation records came from the Route 53 inventory taken in phase 5.
# The API hostname is never declared here; its Worker Custom Domain owns it.
resource "cloudflare_dns_record" "site_apex" {
  zone_id = cloudflare_zone.site.id
  name    = var.zone_name
  type    = "CNAME"
  content = var.site_dns_target
  proxied = var.site_dns_proxied
  ttl     = var.site_dns_proxied ? 1 : 300
}

resource "cloudflare_dns_record" "site_www" {
  zone_id = cloudflare_zone.site.id
  name    = "www.${var.zone_name}"
  type    = "CNAME"
  content = var.site_dns_target
  proxied = var.site_dns_proxied
  ttl     = var.site_dns_proxied ? 1 : 300
}

# 100:: is the discard address, so a hostname pointed here has no origin and is
# served by its Worker route alone.
resource "cloudflare_dns_record" "worker_origin" {
  zone_id = cloudflare_zone.site.id
  name    = "worker-origin.${var.zone_name}"
  type    = "AAAA"
  content = "100::"
  proxied = false
  ttl     = 300
}

resource "cloudflare_dns_record" "site_preview" {
  zone_id = cloudflare_zone.site.id
  name    = "preview.${var.zone_name}"
  type    = "CNAME"
  content = "worker-origin.${var.zone_name}"
  proxied = true
  ttl     = 1
}

# ACM renews the CloudFront certificate through these records, so they must keep
# answering after Cloudflare takes over DNS. Phase 9 removes them once AWS is gone.
resource "cloudflare_dns_record" "acm_validation_apex" {
  zone_id = cloudflare_zone.site.id
  name    = "_f5e5885898d9a2a0526d389220ad8f5a.${var.zone_name}"
  type    = "CNAME"
  content = "_ca0ee2b69275906664298f7a7818b211.jkddzztszm.acm-validations.aws"
  proxied = false
  ttl     = 300
}

resource "cloudflare_dns_record" "acm_validation_www" {
  zone_id = cloudflare_zone.site.id
  name    = "_eac5279345686cf3c78d0e1f8067ec10.www.${var.zone_name}"
  type    = "CNAME"
  content = "_9b3a6a812ef512e23594456c300bf3e9.jkddzztszm.acm-validations.aws"
  proxied = false
  ttl     = 300
}
