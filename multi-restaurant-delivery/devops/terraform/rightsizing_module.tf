module "rightsizing" {
  source       = "git::https://repo/terraform/modules/rightsizing.git"
  cloud        = var.cloud
  resource_ids = var.resource_ids
  thresholds   = { cpu = 50, memory = 60 }
}
