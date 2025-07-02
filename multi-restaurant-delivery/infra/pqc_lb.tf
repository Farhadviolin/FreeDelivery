resource "aws_lb" "pqc" {
  name               = "delivery-pqc-lb"
  load_balancer_type = "network"
  enable_deletion_protection = true
  dynamic "subnet_mapping" {
    for_each = var.subnets
    content {
      subnet_id = subnet_mapping.value
    }
  }
  listener {
    port     = 443
    protocol = "TLS"
    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.pqc.arn
    }
    ssl_policy = "ELBSecurityPolicy-TLS1-3-PostQuantum"
    certificate_arn = aws_acm_certificate.pqc.arn
  }
}
resource "aws_lb_target_group" "pqc" {
  name     = "pqc-targets"
  port     = 443
  protocol = "HTTPS"
  target_type = "instance"
}
