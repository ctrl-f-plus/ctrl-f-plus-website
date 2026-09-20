# infrastructure/cloudflare/variables.tf

variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the zone, the Web Analytics site, and the release tokens."
  type        = string
}

variable "zone_name" {
  description = "Apex domain of the zone this root manages."
  type        = string
  default     = "ctrl-f.plus"
}

variable "site_dns_target" {
  description = "CNAME target for the apex and www records. Phase 5 sets the CloudFront distribution hostname and phase 6 repoints it at the site Worker origin."
  type        = string
}

variable "site_dns_proxied" {
  description = "Whether the apex and www records pass through the Cloudflare proxy. Phase 6 turns this on."
  type        = bool
}

variable "web_analytics_site_tag" {
  description = "Site tag of the Web Analytics site that already exists in the account. This is a different value from the NEXT_PUBLIC_CF_ANALYTICS_TOKEN beacon token."
  type        = string
}
