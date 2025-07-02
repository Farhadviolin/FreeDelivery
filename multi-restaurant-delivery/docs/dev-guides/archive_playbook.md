# Datenarchivierung & Tierspeicherung – Playbook & Hinweise

## Lebenszyklus
- Heiß: PostgreSQL-Partitionen (aktuelle Monate)
- Warm: Iceberg-Table auf S3 (Standard/Infrequent Access)
- Kalt: S3 Glacier (Lifecycle nach 90 Tagen)

## Archivierungsprozess
1. Airflow-DAG exportiert monatliche Partitionen
2. Exportierte Daten werden via Spark/Iceberg in S3 geschrieben
3. S3 Lifecycle verschiebt Daten automatisch in günstigere Tiers
4. Analytics-Teams können via Presto/Trino auf Iceberg zugreifen
5. Restore-Skript für Self-Service-Wiederherstellung

## Compliance & Aufbewahrung
- Lifecycle-Regeln in Terraform (`infra/archive.tf`)
- Aufbewahrungsfristen und Löschregeln dokumentieren
- Zugriffskontrolle via S3-Policies

## Monitoring
- Export-Dauer und Objektalter im Grafana-Dashboard
- Alerts bei Fehlern im Airflow-DAG

## Restore
- Siehe `scripts/restore_from_archive.sh` für Self-Service
- Beispiel: `./restore_from_archive.sh <order_id> <restore_date>`

## Weiterführende Schritte
- Automatisierte Löschung nach Ablauf der Frist
- Audit-Logging für Zugriffe auf Archivdaten
- Playbook regelmäßig aktualisieren
