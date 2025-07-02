# Beispiel-Testskripte und CLI-Kommandos für Edge-Caching & Brotli

## Edge-Cache Hit/Miss
curl -I https://cdn.delivery.com/app.js | grep X-Cache-Status

## Brotli-Kompression testen
curl -H "Accept-Encoding: br" -I https://cdn.delivery.com/index.html | grep Content-Encoding

## Prometheus Metriken prüfen
curl http://nginx:9113/metrics | grep brotli

## Cache Invalidation
curl -X PURGE https://cdn.delivery.com/app.js

## Cloudflare Worker publish
wrangler publish edge/worker.js --name delivery-cdn-worker

## NGINX reload
ssh ops@origin "sudo systemctl reload nginx"

## Terraform Apply Fastly
cd infra/terraform && terraform apply -target=fastly_service_v1.cdn --auto-approve
