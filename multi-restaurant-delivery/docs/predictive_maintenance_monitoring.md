# Predictive Maintenance Monitoring – Quickstart

## Komponenten
- **Airflow DAG**: Modell-Drift-Check, Evidently-Report, Prometheus-Metrik
- **Kafka Feedback-Consumer**: Reparatur-Events → Feature Store
- **Maintenance-API**: Wartungstermine planen (BullMQ)
- **Notification Processor**: Fahrer- und Admin-Benachrichtigung
- **Grafana Dashboard**: Drift-Flag & Verlauf

## Workflows
- **Drift-Check**: Täglich per DAG, Report & Metrik
- **Feedback-Loop**: Reparaturdaten fließen in Feature Store
- **Scheduling**: Wartungstermine via API, Notification an Apps

## Testen
- Airflow-Test: `pytest airflow/tests`
- Feedback-Consumer: `pytest feedback/tests`
- Maintenance-API: `curl -X POST .../schedule ...`
- Grafana: Dashboard importieren & Drift-Flag prüfen

## CI/CD
- Siehe `.github/workflows/ci-pm-drift-monitoring.yml` für automatisierte Tests & Deployments

## Hinweise
- Platzhalter für FeatureStore, Kafka, BullMQ, Prometheus ggf. anpassen
- Reports & Metriken werden automatisiert erzeugt
