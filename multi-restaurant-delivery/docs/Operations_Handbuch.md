# Operations-Handbuch

## Übersicht
Dieses Handbuch beschreibt alle Betriebsprozesse, Alarmierungs- und Eskalationspfade, Backup- und DR-Prozeduren sowie Self-Healing-Mechanismen für die Plattform.

## Alarm- und Eskalationspfade
- Siehe observability/alertmanager.yaml
- Runbooks: docs/runbooks/

## Backup- & DR-Prozeduren
- Siehe disaster/velero-backup.yaml, disaster/restic-backup.sh, disaster/dr_test.sh

## Self-Healing Remediation-Prozesse
- Automatisierte SLO/Alert-Response-Workflows
- Siehe .github/workflows/alerts.yml

## CI/CD & Automatisierung
- Siehe .github/workflows/

## Monitoring
- Siehe observability/slo_rules.yaml, grafana/

## Weitere Details siehe Developer-Wiki
