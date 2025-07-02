from prometheus_client import start_http_server, Gauge
from celery import Celery
import time

app = Celery(broker='redis://redis:6379/0')
active = Gauge('celery_active_tasks', 'Number of active Celery tasks')
reserved = Gauge('celery_reserved_tasks', 'Number of reserved Celery tasks')

def collect():
    i = app.control.inspect()
    active.set(sum(len(v) for v in i.active().values()))
    reserved.set(sum(len(v) for v in i.reserved().values()))

if __name__ == "__main__":
    start_http_server(8000)
    while True:
        collect()
        time.sleep(10)
