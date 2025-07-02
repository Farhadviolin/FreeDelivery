# Beispiel für eine weitere Vault Policy (Read-Only für Partner)
path "secret/data/app/credentials" {
  capabilities = ["read"]
}
path "secret/metadata/app/credentials" {
  capabilities = ["list"]
}
