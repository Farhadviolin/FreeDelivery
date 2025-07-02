# Vault Audit Logging & Compliance
# Aktiviert Audit-Logs im Vault-File-Backend
resource "vault_audit" "file" {
  type = "file"
  options = {
    file_path = "/vault/logs/audit.log"
    log_raw   = "false"
  }
}
