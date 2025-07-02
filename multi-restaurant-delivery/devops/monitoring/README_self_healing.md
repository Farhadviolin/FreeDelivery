# Self-Healing Infrastructure & Automated Remediation

## Komponenten
- Prometheus & Alertmanager: Fehlererkennung, Alert-Trigger
- Cloud Function: Automatische Remediation (Pod-Neustart, Rollback)
- Argo Rollouts: Canary/Blue-Green mit autoRollback
- Healing Operator: Kubernetes Operator für Pod-Healing
- ChatOps: Slack-Bot für Alerts & manuelle Remediation
- Predictive Remediation: MLflow-Modell für proaktive Fehlerbehebung

## Workflows
1. **Fehler erkannt** (Prometheus)
2. **Alert ausgelöst** (Alertmanager)
3. **Remediation** (Cloud Function, Operator, Argo)
4. **Benachrichtigung** (Slack/Teams)
5. **Audit & Monitoring** (Grafana, Logs)

## Runbooks & Troubleshooting
- Siehe `devops/monitoring/runbook_self_healing.md`

## Erweiterung
- Predictive Modelle retrainen
- ChatOps für weitere Plattformen
- Audit-Logs & Compliance

## Dateien
- Alert-Regeln: `devops/monitoring/self_healing_alerts.yaml`
- Alertmanager: `devops/monitoring/alertmanager_self_healing.yaml`
- Remediation: `devops/scripts/remediate.py`
- Operator: `devops/scripts/healing_operator.py`
- Slack-Bot: `devops/scripts/slack_remediate_bot.py`
- Predictive: `ml-ds/notebooks/predictive_remediation.py`
- Runbook: `devops/monitoring/runbook_self_healing.md`
