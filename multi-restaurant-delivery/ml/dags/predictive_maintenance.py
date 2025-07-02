from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from ml.training import extract_features, train_model

with DAG('predictive_maintenance', start_date=datetime(2025,7,1),
         schedule_interval='@daily', catchup=False) as dag:
    feat = PythonOperator(task_id='extract_features', python_callable=extract_features)
    train = PythonOperator(task_id='train_model', python_callable=train_model)
    feat >> train
