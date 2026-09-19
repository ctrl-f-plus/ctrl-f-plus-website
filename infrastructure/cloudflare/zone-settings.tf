resource "cloudflare_zone_setting" "ssl_mode" {
  zone_id    = cloudflare_zone.site.id
  setting_id = "ssl"
  value      = "strict"
}

resource "cloudflare_zone_setting" "minimum_tls_version" {
  zone_id    = cloudflare_zone.site.id
  setting_id = "min_tls_version"
  value      = "1.2"
}

resource "cloudflare_zone_setting" "tls_1_3" {
  zone_id    = cloudflare_zone.site.id
  setting_id = "tls_1_3"
  value      = "on"
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = cloudflare_zone.site.id
  setting_id = "always_use_https"
  value      = "on"
}
