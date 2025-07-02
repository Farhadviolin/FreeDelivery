from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract_data(**context):
    token = context['dag_run'].conf['token']
    # Fetch email from Redis or DB
    # Gather user data from DB, ES, CRM
    # Bundle into ZIP and upload to S3 under key token.zip

def notify_user(**context):
    token = context['dag_run'].conf['token']
    # Send email with pre-signed S3 link via SendGrid

with DAG('dsar_pipeline', start_date=datetime(2025,7,1), schedule_interval=None) as dag:
    t1 = PythonOperator(task_id='extract_data', python_callable=extract_data, provide_context=True)
    t2 = PythonOperator(task_id='notify_user', python_callable=notify_user, provide_context=True)
    t1 >> t2
