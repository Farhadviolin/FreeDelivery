from prometheus_client import Counter, start_http_server
sent = Counter('notifications_sent_total','Total notifications sent', ['channel'])
failed = Counter('notifications_failed_total','Total notifications failed', ['channel'])

# In worker.js, you’d emit via an HTTP POST to this exporter
