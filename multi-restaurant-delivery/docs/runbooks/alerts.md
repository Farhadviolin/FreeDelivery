# Alert Runbook

## Ziel
Schnelle und strukturierte Reaktion auf Monitoring- und Security-Alerts.

## Schritte
1. Alert-Details prüfen (Severity, Service, Zeit)
2. Incident-Channel in Slack/Teams öffnen
3. Verantwortlichen (OnCall) informieren
4. Runbook für betroffenen Service ausführen
5. Status-Update im Incident-Channel
6. Nach Behebung: Post-Mortem und Lessons Learned

## Tools
- Grafana, Prometheus, Alertmanager
- Incident-Response-Runbooks: `docs/runbooks/incident_response.md`

## Eskalation
- Siehe Eskalationsmatrix in `docs/runbooks/escalation.md`
