# deployment.md

## Deployment-Strategie

- Multi-Cloud (AWS, Azure, GCP, On-Prem)
- Kubernetes (Helm, Istio, Argo CD, Rollouts)
- CI/CD: GitHub Actions, Terraform, Helmfile
- Secrets: Vault, Key-Rotation, Compliance
- Monitoring: Prometheus, Grafana, Alertmanager
- Backup/Restore: Velero, Disaster Recovery

## Deployment-Phasen
1. Infrastruktur-Provisionierung (Terraform)
2. Cluster-Bereitstellung (K8s, Helm)
3. Service-Deployment (Argo CD, Rollouts)
4. Monitoring & Alerting aktivieren
5. Backup/Restore testen

## Runbooks
- Siehe `runbooks/` für Onboarding, Incident Response, Escalation

---

**Go-Live-Checkliste:**
- Secrets & Policies geprüft
- Monitoring/Alerting aktiv
- Backup/Restore getestet
- Rollback-Strategie dokumentiert
