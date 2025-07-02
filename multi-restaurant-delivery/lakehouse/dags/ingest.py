from airflow import DAG
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from datetime import datetime

with DAG('ingest_to_bronze', start_date=datetime(2025,7,1),
         schedule_interval='@hourly', catchup=False) as dag:
    spark_job = SparkSubmitOperator(
        task_id='spark_ingest',
        application='/opt/airflow/jobs/ingest_bronze.py',
        conn_id='spark_default'
    )
