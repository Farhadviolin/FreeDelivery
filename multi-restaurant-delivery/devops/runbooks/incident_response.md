# Incident Response & Failover Runbook

## 1. Erkennung
- Monitoring-Alert (Grafana/Prometheus) schlägt an
- Health-Check in Consul/NGINX schlägt fehl

## 2. Analyse
- Prüfe betroffene Region/Service
- Überprüfe DNS-Status (Route 53)
- Kontrolliere Cluster-Health (K8s, Crossplane)

## 3. Failover
- Führe Ansible-Playbook `dr_failover.yml` aus
- Prüfe, ob Traffic auf Secondary-Region läuft
- DNS-Cache leeren (`ipconfig /flushdns`)

## 4. Recovery
- Ursache analysieren und beheben
- Primary-Region wieder aktivieren
- DNS zurückschalten

## 5. Nachbereitung
- Incident-Report schreiben
- Lessons Learned dokumentieren
