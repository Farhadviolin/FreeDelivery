from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
from inventory.reorder import generate_reorder

with DAG('reorder', start_date=datetime(2025,7,1),
         schedule_interval='@daily', catchup=False,
         default_args={'retry_delay':timedelta(minutes=10), 'retries':1}) as dag:
    reorder = PythonOperator(task_id='generate_reorder', python_callable=generate_reorder)
