from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG('dbt_pipeline', start_date=datetime(2025,7,1), schedule_interval='@hourly', catchup=False) as dag:
    run_dbt = BashOperator(
        task_id='dbt_run',
        bash_command='cd analytics && dbt run --profiles-dir . && dbt test'
    )
