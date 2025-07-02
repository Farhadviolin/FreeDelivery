# telemetry.py
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
import time

registry = CollectorRegistry()
g = Gauge('edge_inference_latency_ms','Latency',registry=registry)

def report_latency(latency_ms):
    g.set(latency_ms)
    push_to_gateway('pushgateway:9091',job='edge_device',registry=registry)

# Beispiel: Nach jedem Inferenzlauf
if __name__ == "__main__":
    for i in range(3):
        latency = 42 + i  # Dummywert
        report_latency(latency)
        print(f"Reported latency: {latency} ms")
        time.sleep(2)
