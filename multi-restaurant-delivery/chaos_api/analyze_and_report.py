import requests
import psycopg2
from datetime import datetime

PROM_URL = 'http://prometheus:9090/api/v1/query'
DB_URL = 'postgresql://test:test@localhost:5432/testdb'

# Beispiel: Verfügbarkeit und Fehlerquote vor/nach Experiment
METRICS = {
    'availability': 'avg_over_time(up{job="order-service"}[5m])',
    'error_rate': 'rate(http_requests_total{status=~"5..",job="order-service"}[5m])'
}

def fetch_metric(expr):
    resp = requests.get(PROM_URL, params={'query': expr})
    return float(resp.json()['data']['result'][0]['value'][1])

def analyze_experiment(exp_name, start_time, end_time):
    results = {}
    for key, expr in METRICS.items():
        before = fetch_metric(expr + f' @ {int(start_time.timestamp())}')
        after = fetch_metric(expr + f' @ {int(end_time.timestamp())}')
        results[key] = {'before': before, 'after': after, 'delta': after - before}
    return results

def store_report(exp_name, status, start_time, end_time, metrics):
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO chaos_experiments (name, status, start_time, end_time, metrics) VALUES (%s, %s, %s, %s, %s)",
        (exp_name, status, start_time, end_time, json.dumps(metrics))
    )
    conn.commit()
    cur.close()
    conn.close()

# Beispiel-Aufruf
if __name__ == '__main__':
    exp_name = 'pod-kill-experiment'
    start_time = datetime.utcnow()
    # ... Experiment läuft ...
    end_time = datetime.utcnow()
    metrics = analyze_experiment(exp_name, start_time, end_time)
    store_report(exp_name, 'completed', start_time, end_time, metrics)
