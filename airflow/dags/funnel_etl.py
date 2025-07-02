from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG('funnel_etl', start_date=datetime(2025,7,1),
         schedule_interval='@hourly', catchup=False) as dag:
    load = BashOperator(
        task_id='load_kafka_to_bq',
        bash_command="""
        bq load \
          --source_format=AVRO \
          analytics.raw_events \
          gs://kafka-exports/{{ ds }}/*.avro
        """
    )
    transform = BashOperator(
        task_id='dbt_run',
        bash_command='cd analytics && dbt run --models funnels'
    )
    load >> transform 