from airflow import DAG
from airflow.operators.python import PythonOperator
from evidently.dashboard import Dashboard
from evidently.dashboard.tabs import DataDriftTab
from datetime import datetime
import pandas as pd
from feast import FeatureStore
from mlflow import client

def run_drift_check():
    # Lade historische Produktions-Daten
    fs = FeatureStore(repo_path="infra/feature_repo")
    hist = fs.get_historical_features(
        entity_df=pd.DataFrame({'vehicle_id': [...], 'event_timestamp': [...] }),
        feature_refs=['vehicle:temp_last','vehicle:vib_last']
    ).to_df()
    # Aktuelle Daten aus Online-Store
    online = fs.get_online_features(
      ['vehicle:temp_last','vehicle:vib_last'],
      [{'vehicle_id': vid} for vid in hist['vehicle_id']]
    ).to_df()
    # Erstelle Drift-Dashboard
    dashboard = Dashboard(tabs=[DataDriftTab()])
    dashboard.calculate(ref_data=hist, current_data=online)
    dashboard.save("dags/reports/pm_drift.html")
    # Export wichtige Metriken
    drift_metric = dashboard._save()['data_drift']['metrics']['dataset_drift']
    # Push zu Prometheus via Pushgateway
    from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
    registry = CollectorRegistry()
    g = Gauge('pm_data_drift', 'Data drift flag', registry=registry)
    g.set(int(drift_metric))
    push_to_gateway('pushgateway:9091', job='pm_drift', registry=registry)

with DAG('pm_drift_check', start_date=datetime(2025,7,1),
          schedule_interval='@daily', catchup=False) as dag:
    PythonOperator(task_id='drift_check', python_callable=run_drift_check)
