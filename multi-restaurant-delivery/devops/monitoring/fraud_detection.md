# fraud_detection.md

## KI-gestützte Betrugserkennung (Fraud Detection)

### 1. Echtzeit-Scoring
- FastAPI-Service (`fraud_scoring_service.py`): Score für jede Transaktion
- Features aus Feast Online Store, Model-Serving mit XGBoost
- Redis-Cache für Low-Latency

### 2. Anomaly Detection & Rules
- Flink/Spark Streaming für Feature Enrichment
- Prometheus-Regeln für Fraud-Alerts (`fraud.yaml`)
- Rule-Engine für sofortige Sperrungen

### 3. Feedback-Loop & Retraining
- Analysten labeln Fälle in Postgres
- Airflow DAG für tägliches Retraining (`fraud_retrain.py`)

### 4. Alerting & Case Management
- Alerts → Case Service (`case_service.py`), DB: `fraud_cases.sql`
- Audit-Logs in ELK

### 5. CI/CD & Tests
- Workflow: `.github/workflows/fraud_detection.yml`
- Unit- und Integrationstests für Scoring, Feature Retrieval, Alerts

---

Siehe auch: `ml-ds/inference/`, `devops/airflow/dags/`, `devops/monitoring/prometheus-rules/`, `database/migrations/`, `backend/analytics-service/src/`
