# Real-Time Analytics Pipeline – Quickstart

## Komponenten
- **Flink Job**: Echtzeit-Event-Enrichment (Kafka → Kafka)
- **Spark Job**: Micro-Batch-Write nach Delta Lake
- **Airflow DAG**: Orchestriert dbt-Transformationen
- **Materialize**: Realtime Views für Dashboards
- **FastAPI**: Data API für Self-Service

## Workflows
- Events → Flink (Enrichment) → Kafka (enriched)
- Spark liest enriched-events, schreibt nach Delta Lake
- dbt/Trino/Materialize für Ad-hoc- und Realtime-Queries
- FastAPI-Endpoint für aktuelle Metriken

## Testen
- Flink: `pytest flink/tests`
- Spark: `pytest spark/tests`
- API: `curl http://localhost:8000/metrics/orders/latest?limit=5`

## CI/CD
- Siehe `.github/workflows/ci-realtime-analytics.yml` für automatisierte Tests & Deployments

## Hinweise
- Kafka-, Delta-, Materialize- und API-Endpunkte ggf. anpassen
- SQL- und Connector-Details in den Jobs nach Bedarf ergänzen
