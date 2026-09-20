# The provider documents the import id as "<account_id>/<site_id>", and the
# site id is the site tag this root takes as a variable.
import {
  to = cloudflare_web_analytics_site.site
  id = "${var.cloudflare_account_id}/${var.web_analytics_site_tag}"
}

resource "cloudflare_web_analytics_site" "site" {
  account_id   = var.cloudflare_account_id
  host         = var.zone_name
  auto_install = false
}
