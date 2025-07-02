resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = "api.delivery.com"
  type    = "A"
  set_identifier = "region-a"
  failover_routing_policy {
    type = "PRIMARY"
  }
  alias {
    name                   = aws_lb.api_a.dns_name
    zone_id                = aws_lb.api_a.zone_id
    evaluate_target_health = true
  }
}
resource "aws_route53_record" "api_backup" {
  zone_id = var.zone_id
  name    = "api.delivery.com"
  type    = "A"
  set_identifier = "region-b"
  failover_routing_policy {
    type = "SECONDARY"
  }
  alias {
    name                   = aws_lb.api_b.dns_name
    zone_id                = aws_lb.api_b.zone_id
    evaluate_target_health = true
  }
}
