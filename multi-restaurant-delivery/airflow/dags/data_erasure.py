from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import sqlalchemy

def erase_data(**kwargs):
    engine = sqlalchemy.create_engine("postgresql://...")
    threshold = datetime.utcnow() - timedelta(days=365)
    engine.execute("DELETE FROM personal_data WHERE created_at < %s", (threshold,))

with DAG('data_erasure', start_date=datetime(2025,7,1), schedule_interval='@daily', catchup=False) as dag:
    PythonOperator(task_id='erase_old_pii', python_callable=erase_data)
