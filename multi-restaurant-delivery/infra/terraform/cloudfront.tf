resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "s3-assets"
  }
  origin {
    domain_name = aws_api_gateway_deployment.api.invoke_url
    origin_id   = "api-origin"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
    }
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  default_cache_behavior {
    allowed_methods  = ["GET","HEAD"]
    cached_methods   = ["GET","HEAD"]
    target_origin_id = "s3-assets"
    viewer_protocol_policy = "redirect-to-https"
    forward_cookies = "none"
    forwarded_values {
      query_string = false
    }
    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    target_origin_id = "api-origin"
    allowed_methods  = ["GET","HEAD","OPTIONS"]
    cached_methods   = ["GET","HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = true
      headers      = ["Authorization"]
    }
    min_ttl     = 0
    default_ttl = 30
    max_ttl     = 300
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cdn.arn
    ssl_support_method  = "sni-only"
  }
}
