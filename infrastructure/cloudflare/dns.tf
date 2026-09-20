# infrastructure/cloudflare/dns.tf

# The Route 53 inventory taken in phase 5 may add more records to this file.
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
