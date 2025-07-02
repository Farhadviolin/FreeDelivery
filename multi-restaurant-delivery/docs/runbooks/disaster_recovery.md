# Disaster Recovery Playbook

## Ziel
Sicherstellung der Wiederherstellbarkeit aller kritischen Systeme und Daten nach Ausfällen oder Angriffen.

## Maßnahmen
- Tägliche Backups (Datenbanken, Blob Storage, Configs)
- Restore-Tests mindestens monatlich
- Notfallkontakte und Eskalationsmatrix
- Dokumentierte Recovery-Runbooks pro Service
- Automatisierte Velero-Backups für K8s

## Ablauf im Ernstfall
1. Incident identifizieren und klassifizieren
2. Recovery-Runbook für betroffenen Service ausführen
3. Kommunikation an Stakeholder
4. Lessons Learned dokumentieren

## Siehe auch
- `devops/terraform/velero/`
- `devops/monitoring/`
- `docs/runbooks/incident_response.md`
