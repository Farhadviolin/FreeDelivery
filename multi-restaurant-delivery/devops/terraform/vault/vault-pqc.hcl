# vault-pqc.hcl
path "pki_int/issue/delivery-pqc" {
  capabilities = ["update"]
  key_type     = "EC_P384"  # klassische und PQC: "oqs_default"
  allowed_domains = ["delivery.local"]
  max_ttl      = "8760h"
  allowed_key_types = ["rsa", "ec_p256", "oqs_default"]
}
