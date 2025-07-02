from celery import Celery

app = Celery(
    'tasks',
    broker='redis://redis:6379/0',
    backend='redis://redis:6379/1'
)
app.conf.update(
    task_routes={'worker.tasks.*': {'queue': 'default'}},
    task_annotations={'*': {'rate_limit': '10/s'}},
    task_default_retry_delay=60,
    task_max_retries=3,
)
