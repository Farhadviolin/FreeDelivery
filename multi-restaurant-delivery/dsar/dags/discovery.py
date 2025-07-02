from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from dsar.discovery import discover_and_export

with DAG('dsar_discovery', start_date=datetime(2025,7,1),
         schedule_interval=None, catchup=False) as dag:
    task = PythonOperator(task_id='discover', python_callable=discover_and_export)
