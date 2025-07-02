from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import subprocess

def export_partition(ds, **kwargs):
    table = f"orders_{ds[:7].replace('-','_')}"
    subprocess.run(["psql","-c",
        f"COPY {table} TO STDOUT..."], check=True)
    # Load into Iceberg via Spark job or AWS CLI
    subprocess.run(["spark-submit","--class","ArchivePartition",...], check=True)

def apply_lifecycle():
    import boto3
    s3 = boto3.client('s3')
    s3.put_bucket_lifecycle_configuration(
      Bucket='delivery-archive',
      LifecycleConfiguration={'Rules':[
        {'ID':'to-IA','Prefix':'orders/','Status':'Enabled',
         'Transitions':[{'Days':30,'StorageClass':'STANDARD_IA'}]},
        {'ID':'to-Glacier','Prefix':'orders/','Status':'Enabled',
         'Transitions':[{'Days':90,'StorageClass':'GLACIER'}]}
      ]}
    )

with DAG('archive_orders', start_date=datetime(2025,7,1),
         schedule_interval='@monthly', catchup=False) as dag:
    export = PythonOperator(task_id='export', python_callable=export_partition, op_kwargs={'ds':'{{ ds }}'})
    lifecycle = PythonOperator(task_id='lifecycle', python_callable=apply_lifecycle)
    export >> lifecycle
