from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime
with DAG('full_funnel_etl', start_date=datetime(2025, 7, 1), schedule_interval='@hourly', catchup=False) as dag:
    run_dbt = BashOperator(
        task_id='run_dbt',
        bash_command='dbt run --project-dir /opt/dbt',
    )
