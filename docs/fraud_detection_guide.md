# Fraud Detection System – User Guide

## Übersicht
Dieses System erkennt betrügerische Aktivitäten (z. B. Zahlungsbetrug, Fake-Bestellungen) in Echtzeit und automatisiert Abwehrmaßnahmen.

## Komponenten
- **Flink Feature-Job:** Echtzeit-Feature-Engineering aus Kafka-Events
- **Feast Feature Store:** Speicherung und Bereitstellung von Features
- **Airflow DAG:** Tägliches Training des Fraud-Modells (XGBoost)
- **Fraud-Scoring-API:** Echtzeit-Scoring jeder Bestellung
- **Order-Service-Integration:** Automatische Blockierung/Markierung
- **Monitoring:** Prometheus/Grafana, Alerts bei Fraud-Spikes

## Nutzung
1. **Flink-Job starten:**
   ```bash
   python flink/jobs/fraud_features.py
   ```
2. **Airflow DAG triggern:**
   ```bash
   airflow dags trigger train_fraud
   ```
3. **Fraud-API lokal testen:**
   ```bash
   uvicorn fraud_service.app.main:app --reload --port 8001
   curl -X POST http://localhost:8001/score/order123
   ```
4. **Order-Service-Integration:**
   - Siehe `order_service/app/fraud_check.py`
5. **Monitoring & Alerts:**
   - Siehe `grafana/fraud_dashboard.json` und `devops/monitoring/prometheus/fraud_detection_alerts.yml`

## Anpassung
- Feature-Engineering und Modell-Logik in Flink/Airflow/MLflow anpassen
- Alert-Thresholds in Prometheus-Regeln justieren
- Weitere Features und Block-Logik im Order-Service ergänzen
