from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from training.train_anomaly import main as train

with DAG('anomaly_retrain', start_date=datetime(2025,7,1),
         schedule_interval='@weekly', catchup=False) as dag:
    PythonOperator(task_id='train_anomaly', python_callable=train)
