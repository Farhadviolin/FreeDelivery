# SLA Incident Runbook

## HighErrorRate
1. Check service logs via Grafana Explore.
2. Verify recent deployments.
3. Scale up replicas if under high load.

## HighLatency
1. Profile latest traces in Tempo.
2. Investigate site performance (CPU, GC).
3. Adjust autoscaling thresholds.
