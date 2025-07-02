from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import boto3, pandas as pd, sqlalchemy

def fetch_and_store_costs():
    ce = boto3.client('ce', region_name='us-east-1')
    end = datetime.utcnow().date()
    start = end - timedelta(days=30)
    resp = ce.get_cost_and_usage(
        TimePeriod={'Start': start.isoformat(), 'End': end.isoformat()},
        Granularity='DAILY',
        Metrics=['BlendedCost']
    )
    df = pd.DataFrame(resp['ResultsByTime'])
    engine = sqlalchemy.create_engine("postgresql://finops:password@db/finops")
    df.to_sql('monthly_costs', engine, if_exists='replace', index=False)

with DAG('finops_reporting', start_date=datetime(2025,7,1),
          schedule_interval='@monthly', catchup=False) as dag:
    PythonOperator(task_id='fetch_costs', python_callable=fetch_and_store_costs)
