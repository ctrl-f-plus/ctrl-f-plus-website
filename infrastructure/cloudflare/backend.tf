# infrastructure/cloudflare/backend.tf

terraform {
  cloud {
    organization = "Ctrl-F-Plus"

    workspaces {
      name = "ctrl-f-plus-cloudflare"
    }
  }
}
