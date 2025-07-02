module "slurm" {
  source  = "github.com/kilief/helm-charts/slurm-operator"
  version = "0.1.0"
  values = {
    controller = { replicas = 2 }
    compute    = { instanceType = "c6i.4xlarge", min = 0, max = 20 }
  }
}
