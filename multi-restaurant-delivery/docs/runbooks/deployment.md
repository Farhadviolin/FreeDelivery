# Runbook: Deployment

## Voraussetzungen
- Zugang zu CI/CD, K8s, Vault

## Schritte
1. Code pushen/mergen
2. CI/CD-Workflow prüfen
3. Deployment via kubectl oder Helm
4. Health-Checks & Monitoring

## Rollback
- Letztes Release-Tag in Git
- Helm/K8s Rollback-Befehl
