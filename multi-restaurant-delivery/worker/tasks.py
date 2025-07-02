from .celery_app import app

@app.task(bind=True)
def process_order(self, order_id):
    try:
        # Verarbeitung
        pass
    except Exception as exc:
        raise self.retry(exc=exc)

# Periodischer Task via Celery Beat
from celery.schedules import crontab
app.conf.beat_schedule = {
    'cleanup-daily': {
        'task': 'worker.tasks.cleanup',
        'schedule': crontab(hour=2, minute=0),
    },
}

@app.task
def cleanup():
    # Alte Daten löschen
    pass
