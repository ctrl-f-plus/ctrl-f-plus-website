# infrastructure/cloudflare/backend.tf

terraform {
  cloud {
    organization = "OWNER_HCP_ORGANIZATION"

    workspaces {
      name = "ctrl-f-plus-cloudflare"
    }
  }
}
