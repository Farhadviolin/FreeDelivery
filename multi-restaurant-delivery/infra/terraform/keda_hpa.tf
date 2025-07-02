resource "kubernetes_horizontal_pod_autoscaler" "order_hpa" {
  metadata { name = "order-service-hpa" }
  spec {
    scale_target_ref {
      kind       = "Deployment"
      name       = "order-service"
      api_version = "apps/v1"
    }
    min_replicas = 3
    max_replicas = 20
    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type               = "Utilization"
          average_utilization = 60
        }
      }
    }
  }
}
module "payment_keda" {
  source = "./modules/keda-scaledobject"
  name   = "payment-consumer"
  kafka = {
    bootstrap_servers = var.kafka_servers
    topic              = "payment-events"
    consumer_group     = "payment-group"
    lag_threshold      = 100
  }
}
