locals {
  common_vars = {
    region = "eu-central-1"
    project = "delivery"
  }
}

terraform {
  source = "./modules/k8s-cluster"
}

include {
  path = find_in_parent_folders()
}

inputs = local.common_vars
