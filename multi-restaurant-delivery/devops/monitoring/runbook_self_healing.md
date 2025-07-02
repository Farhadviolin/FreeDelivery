# runbook_self_healing.md

## Self-Healing & Automated Remediation Runbook

### 1. Fehlererkennung
- Prometheus-Alerts (CrashLoop, CPU/Memory-Spikes)
- Alertmanager Webhook an Cloud Function & Slack

### 2. Automatische Remediation
- Cloud Function (`remediate.py`) löscht/rollt Pods zurück
- Argo Rollouts mit autoRollback für Deployments
- Healing Operator prüft regelmäßig Pod-Status

### 3. ChatOps
- Slack-Bot empfängt Alerts und erlaubt `/heal <pod>`
- Alle Aktionen werden geloggt (Audit)

### 4. Predictive Remediation
- MLflow-Modell analysiert Metriken, triggert proaktiv Remediation
- Skript: `ml-ds/notebooks/predictive_remediation.py`

### 5. Monitoring & Audit
- Grafana Dashboards für Alerts, Remediation-Events
- Audit-Logs in ELK/S3

### 6. Manuelle Eingriffe
- `kubectl delete pod ...` bei Bedarf
- Rollback via Argo UI

### 7. Troubleshooting
- Operator-Logs: `kubectl logs deployment/healing-operator -n delivery`
- Slack-Bot-Logs: `kubectl logs deployment/slack-remediate-bot -n ops`
- Cloud Function-Logs: Cloud Provider Console

### 8. Erweiterung
- Predictive Modelle regelmäßig retrainen
- Alert-Tuning (Hysterese, False Positives)
- ChatOps für Teams/MS Teams ergänzen
