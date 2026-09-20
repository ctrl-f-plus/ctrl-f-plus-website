resource "cloudflare_zone" "site" {
  account = {
    id = var.cloudflare_account_id
  }
  name = var.zone_name
  type = "full"

  lifecycle {
    prevent_destroy = true
  }
}
