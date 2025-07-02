resource "aws_eks_node_group" "on_demand" {
  cluster_name    = var.cluster_name
  node_group_name = "ng-on-demand"
  node_role_arn   = aws_iam_role.eks_node.arn
  scaling_config { desired_size = 3; max_size = 10; min_size = 3 }
  instance_types  = ["t3.large"]
  labels          = { lifecycle = "on-demand" }
  taints          = []
}

resource "aws_eks_node_group" "spot" {
  cluster_name    = var.cluster_name
  node_group_name = "ng-spot"
  node_role_arn   = aws_iam_role.eks_node.arn
  scaling_config { desired_size = 5; max_size = 20; min_size = 1 }
  capacity_type   = "SPOT"
  instance_types  = ["t3.large","t3a.large"]  # fallback pool
  labels          = { lifecycle = "spot" }
  taints          = [{ key = "spot", value = "true", effect = "NoSchedule" }]
}
