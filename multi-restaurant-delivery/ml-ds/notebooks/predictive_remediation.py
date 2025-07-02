# predictive_remediation.py
import mlflow, numpy as np
from prometheus_api_client import PrometheusConnect
import requests

prom = PrometheusConnect(url="http://prometheus:9090", disable_ssl=True)
model = mlflow.pyfunc.load_model("models:/remediation-predictor/Production")

# Beispiel: Hole Metriken und triff Vorhersage
metrics = prom.custom_query(query="rate(kube_pod_container_status_restarts_total[5m])")
X = np.array([[m['value'][1]] for m in metrics])
pred = model.predict(X)
for i, m in enumerate(metrics):
    if pred[i] > 0.8:
        pod = m['metric']['pod']
        ns = m['metric']['namespace']
        # Trigger Remediation
        requests.post('https://functions.delivery.com/remediate',
                      json=[{'labels': {'namespace': ns, 'pod': pod}}])
        print(f"Predictive remediation triggered for {pod}")
