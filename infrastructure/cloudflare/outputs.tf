# infrastructure/cloudflare/outputs.tf

#
output "name_servers" {
  description = "Cloudflare nameservers to enter at the registrar."
  value       = cloudflare_zone.site.name_servers
}

output "zone_id" {
  description = "Zone identifier that Worker Routes and the API Custom Domain need."
  value       = cloudflare_zone.site.id
}

output "account_id" {
  description = "Cloudflare account identifier."
  value       = var.cloudflare_account_id
}

output "site_release_token" {
  description = "Token value the site Worker release workflow uses."
  value       = cloudflare_account_token.site_release.value
  sensitive   = true
}

output "api_release_token" {
  description = "Token value the API Worker release workflow uses."
  value       = cloudflare_account_token.api_release.value
  sensitive   = true
}
