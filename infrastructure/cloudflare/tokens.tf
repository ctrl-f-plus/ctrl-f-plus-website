# infrastructure/cloudflare/tokens.tf

data "cloudflare_account_api_token_permission_groups_list" "account" {
  account_id = var.cloudflare_account_id
}

locals {
  release_permission_group_selectors = [
    { name = "Workers Scripts Write", scope = "com.cloudflare.api.account" },
    { name = "Workers Routes Write", scope = "com.cloudflare.api.account.zone" },
    { name = "Zone Read", scope = "com.cloudflare.api.account.zone" },
  ]

  release_permission_groups = [
    for permission_group_selector in local.release_permission_group_selectors : {
      id = one([
        for permission_group in data.cloudflare_account_api_token_permission_groups_list.account.result :
        permission_group.id
        if permission_group.name == permission_group_selector.name
        && contains(permission_group.scopes, permission_group_selector.scope)
      ])
    }
  ]

  release_token_resources = jsonencode({
    "com.cloudflare.api.account.${var.cloudflare_account_id}"    = "*"
    "com.cloudflare.api.account.zone.${cloudflare_zone.site.id}" = "*"
  })
}

resource "cloudflare_account_token" "site_release" {
  account_id = var.cloudflare_account_id
  name       = "site-worker-release"

  policies = [{
    effect            = "allow"
    permission_groups = local.release_permission_groups
    resources         = local.release_token_resources
  }]
}

resource "cloudflare_account_token" "api_release" {
  account_id = var.cloudflare_account_id
  name       = "api-worker-release"

  policies = [{
    effect            = "allow"
    permission_groups = local.release_permission_groups
    resources         = local.release_token_resources
  }]
}
