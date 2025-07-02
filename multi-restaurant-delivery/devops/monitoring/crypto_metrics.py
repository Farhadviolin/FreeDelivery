# crypto_metrics.py
from prometheus_client import Counter, Gauge, start_http_server

crypto_ops_total = Counter('crypto_ops_total', 'Total crypto operations', ['type'])
crypto_errors_total = Counter('crypto_errors_total', 'Total crypto errors', ['type'])
crypto_latency_ms = Gauge('crypto_latency_ms', 'Crypto operation latency (ms)', ['type'])

if __name__ == "__main__":
    start_http_server(9100)
    import time, random
    while True:
        op_type = random.choice(['encrypt','decrypt','sign','verify'])
        crypto_ops_total.labels(type=op_type).inc()
        latency = random.randint(5, 50)
        crypto_latency_ms.labels(type=op_type).set(latency)
        if random.random() < 0.05:
            crypto_errors_total.labels(type=op_type).inc()
        time.sleep(2)
