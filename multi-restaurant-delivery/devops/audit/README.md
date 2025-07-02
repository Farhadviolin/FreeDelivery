# Audit-Trail & Compliance Dashboard – Architekturdiagramm

```mermaid
flowchart LR
  Services -->|Auditbeat| Elasticsearch
  Filebeat -->|App-Logs| Logstash --> Elasticsearch
  Elasticsearch --> Kibana[Compliance-Dashboard]
  PostgreSQL -->|AuthLogs| Filebeat
  Grafana -->|Alerts| Slack_Channel
```
