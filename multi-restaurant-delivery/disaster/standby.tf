module "eks_primary" {
  source = "terraform-aws-modules/eks/aws"
  # primary cluster config
}
module "eks_standby" {
  source = "terraform-aws-modules/eks/aws"
  # standby in different region
  region = "eu-west-1"
}
