variable "provider" { type = string }
variable "region"   { type = string }
variable "project"  { type = string }

provider "aws" {
  alias  = "aws"
  region = var.region
  # OIDC via GitHub Actions
}

provider "google" {
  alias   = "gcp"
  project = var.project
  region  = var.region
}

resource "aws_eks_cluster" "this" {
  count = var.provider == "aws" ? 1 : 0
  name  = "${var.project}-eks"
  # ...
}

resource "google_container_cluster" "this" {
  count    = var.provider == "gcp" ? 1 : 0
  name     = "${var.project}-gke"
  location = var.region
  # ...
}

resource "kubernetes_cluster" "onprem" {
  count = var.provider == "onprem" ? 1 : 0
  # self-hosted config
}
