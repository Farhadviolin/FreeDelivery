# Disaster Recovery Playbook für Betriebsteams

## 1. Backup-Status prüfen
- Velero: `velero backup get`
- Restic: `kubectl get jobs -n delivery | grep restic`
- PostgreSQL WAL: `aws s3 ls s3://delivery-backups/pg-wal/`

## 2. Restore-Drill durchführen
- Ansible-Playbook ausführen:
  ```bash
  ansible-playbook ansible/restore.yml
  ```
- Prüfen, ob alle Pods wieder laufen:
  ```bash
  kubectl get pods -n delivery
  ```
- PostgreSQL PITR prüfen:
  ```bash
  psql -c "SELECT 1;"
  ```

## 3. RTO/RPO & SLA
- Ziel-RTO: < 30 Minuten
- Ziel-RPO: < 5 Minuten
- Monitoring: Grafana Dashboard `Backup & DR Monitoring`

## 4. Fehlerbehebung
- Logs prüfen: `velero logs`, `kubectl logs job/restic-backup`, `pg_wal_lag_seconds` in Grafana
- Bei Problemen: Recovery-Owner kontaktieren (siehe OnCall-Liste)

---
Letzte Aktualisierung: 2025-07-01
