from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from celery import Celery

celery_app = Celery('tasks', broker='redis://redis:6379/0')
def enqueue_order(order_id):
    celery_app.send_task('worker.tasks.process_order', args=[order_id])

def cleanup():
    celery_app.send_task('worker.tasks.cleanup')

define_args = {'owner': 'airflow', 'start_date': datetime(2025, 7, 1)}
dag = DAG('order_to_celery', default_args=define_args, schedule_interval='@hourly')

PythonOperator(
    task_id='enqueue_order',
    python_callable=enqueue_order,
    op_args=[123],
    dag=dag
)
PythonOperator(
    task_id='cleanup',
    python_callable=cleanup,
    dag=dag
)
