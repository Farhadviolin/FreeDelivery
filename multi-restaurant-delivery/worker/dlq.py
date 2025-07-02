from celery import Celery
from kombu import Queue

app = Celery('tasks', broker='redis://redis:6379/0', backend='redis://redis:6379/1')
app.conf.task_queues = (
    Queue('default', routing_key='task.#'),
    Queue('dead_letter', routing_key='dlq.#'),
)

@app.task(bind=True, default_retry_delay=10, max_retries=2)
def fragile_task(self, x):
    try:
        if x < 0:
            raise ValueError('Negative!')
        return x * 2
    except Exception as exc:
        if self.request.retries >= self.max_retries:
            # Sende in DLQ
            self.apply_async(args=[x], queue='dead_letter', routing_key='dlq.fragile')
        raise self.retry(exc=exc)
