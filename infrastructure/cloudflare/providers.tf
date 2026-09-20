# infrastructure/cloudflare/providers.tf

# The provider reads its token from CLOUDFLARE_API_TOKEN in the environment.
provider "cloudflare" {}
