from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from ml.segmentation import train_segments, score_propensity

with DAG('segmentation_campaign', start_date=datetime(2025,7,1),
         schedule_interval='@daily', catchup=False) as dag:
    seg = PythonOperator(task_id='train_segments', python_callable=train_segments)
    prop = PythonOperator(task_id='score_propensity', python_callable=score_propensity)
    seg >> prop
