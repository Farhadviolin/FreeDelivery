from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import pandas as pd
import xgboost as xgb
from mlflow import log_model

def train_model():
    # Lade Telemetriedaten aus Influx
    from influxdb_client import InfluxDBClient
    client = InfluxDBClient(url="http://influxdb:8086", token="INFLUX_TOKEN", org="delivery")
    query = 'from(bucket:"vehicle_metrics") |> range(start: -30d)'
    tables = client.query_api().query_data_frame(query)
    df = tables[['vehicle_id','temperature','vibration','timestamp']]
    # Feature Engineering und Label (Ausfall in nächsten 7 Tagen)
    # ...
    # Dummy-Trainingsdaten für Boilerplate
    X_train = df[['temperature','vibration']].fillna(0)
    y_train = (df['temperature'] > 80).astype(int)  # Dummy-Label
    model = xgb.XGBClassifier().fit(X_train, y_train)
    log_model(model, "predictive_maintenance_model")
    # Materialize Features
    from feast import Client
    feast_client = Client()
    feast_client.materialize_incremental(end_date=datetime.utcnow())

with DAG('pm_train', start_date=datetime(2025,7,1), schedule_interval='@daily', catchup=False) as dag:
    PythonOperator(task_id='train_pm', python_callable=train_model)
