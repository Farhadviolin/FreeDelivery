resource "fastly_service_v1" "cdn" {
  name = "delivery-platform"

  backend {
    name        = "origin"
    address     = "app.delivery.com"
    use_ssl     = true
  }

  cache_setting {
    name          = "default-cache"
    ttl            = 60
    action         = "cache"
    general_regex = ".*"
  }

  gzip {
    name        = "gzip-compression"
    content_types = ["text/html","application/javascript","text/css"]
  }
  brotli {
    name         = "brotli-compression"
    content_types = ["text/html","application/javascript","text/css"]
  }
}
