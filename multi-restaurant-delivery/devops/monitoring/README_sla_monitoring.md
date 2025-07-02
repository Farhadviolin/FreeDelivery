# SLA Monitoring & Auto-Escalation

## Komponenten
- Prometheus: Service- & Endpoint-Metriken
- Prometheus SLO: SLO-Definitionen & Berechnung
- Alertmanager: Eskalationsrouten (PagerDuty, Slack, Incident-Service)
- Incident-Service: Logging & Lifecycle (Postgres)
- Grafana: SLA-Dashboards, OnCall-Panel

## Workflows
1. **SLA-Verletzung erkannt** (Prometheus SLO)
2. **Alert ausgelöst** (Alertmanager)
3. **Eskalation** (PagerDuty, Slack, Incident-Service)
4. **Incident-Log** (Postgres)
5. **Reporting** (Grafana Dashboards, PDF-Export)

## Dateien
- SLO-Definition: `devops/monitoring/slo_delivery_api.yaml`
- Alertmanager: `devops/monitoring/alertmanager_sla_escalation.yaml`
- Incident-Service: `devops/scripts/incident_service.py`
- PagerDuty-Trigger: `devops/scripts/pd_trigger.py`
- Migration: `database/migrations/incidents.sql`
- CI/CD-Test: `.github/workflows/sla_monitoring.yml`

## Hinweise
- SLOs regelmäßig reviewen
- Eskalationsketten und OnCall-Rotation pflegen
- Incident-Logs und Postmortems sichern
