provider "vault" { address = var.vault_addr }
provider "github" { token = var.github_token }

resource "vault_kv_secret_v2" "app_creds" {
  mount   = "secret"
  name    = "app/credentials"
  data = {
    DB_USER     = var.db_user
    DB_PASSWORD = var.db_password
  }
}

resource "vault_github_auth_backend" "github" {
  description = "GitHub OIDC Auth"
}

resource "vault_github_auth_backend_role" "actions" {
  backend           = vault_github_auth_backend.github.path
  role_name         = "github-actions"
  organization      = var.github_org
  policies          = ["ci-policy"]
  token_ttl         = "1h"
  token_max_ttl     = "4h"
}

resource "github_actions_organization_secret" "vault_addr" {
  secret_name      = "VAULT_ADDR"
  plaintext_value  = var.vault_addr
  visibility       = "all"
}
resource "github_actions_organization_secret" "vault_role" {
  secret_name      = "VAULT_ROLE"
  plaintext_value  = "github-actions"
  visibility       = "all"
}
