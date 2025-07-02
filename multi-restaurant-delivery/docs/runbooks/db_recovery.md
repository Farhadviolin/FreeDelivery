# Runbook: Datenbank-Recovery

## Voraussetzungen
- Backup-Strategie, Zugang zu DB, S3

## Schritte
1. Letztes Backup identifizieren
2. Restore-Befehl ausführen (z.B. pg_restore)
3. Applikation prüfen

## Hinweise
- Recovery-Tests regelmäßig durchführen
- Monitoring auf Datenintegrität
