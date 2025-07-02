# Disaster Recovery Playbook – Multi-Cloud

## 1. Szenarien
- Cloud-Region-Ausfall (AWS/GCP/On-Prem)
- Datenverlust (DB, Object Storage)
- K8s-Cluster-Korruption

## 2. Sofortmaßnahmen
- Incident-Channel öffnen (Slack/MS Teams)
- Statuspage aktualisieren
- Verantwortliche informieren (OnCall)

## 3. Recovery-Prozesse
### a) Cross-Cloud Failover
- Terragrunt Apply für Standby-Cloud:
  - `terragrunt apply --terragrunt-working-dir infrastructure/gcp`
- DNS-Switch (z.B. Route53/GCP DNS)
- Vault-Secret-Access prüfen

### b) Datenwiederherstellung
- Restore aus S3/GCS/OnPrem-Backup
- DB-Point-in-Time-Recovery (PITR)
- K8s-Restore (Velero)

### c) Monitoring & Validierung
- Prometheus Federation: Health aller Cluster prüfen
- Smoke-Tests (API, UI, Mobile)

## 4. Lessons Learned & Reporting
- Postmortem-Template ausfüllen
- Kostenanalyse (Cost-Governance)
- Maßnahmen für SLA-Verbesserung ableiten
