# AWS Role
path "secret/data/aws/*" {
  capabilities = ["read"]
}
# GCP Role
path "secret/data/gcp/*" {
  capabilities = ["read"]
}
