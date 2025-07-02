# Worker-Task-Management & Scheduling

## Schnellstart

1. Redis starten (z.B. via Docker)
2. Python-Abhängigkeiten installieren:
   ```bash
   pip install -r requirements.txt
   ```
3. Worker starten:
   ```bash
   celery -A worker.celery_app worker --loglevel=info --concurrency=4
   ```
4. Scheduler starten:
   ```bash
   celery -A worker.celery_app beat --loglevel=info
   ```
5. Flower Monitoring:
   ```bash
   kubectl apply -f worker/k8s/flower.yaml
   # Zugriff auf http://<cluster-ip>:5555
   ```
6. Prometheus-Metriken:
   ```bash
   python metrics.py
   # Zugriff auf http://localhost:8000/metrics
   ```

## Kubernetes & HPA
- Deployment: `worker/k8s/deployment.yaml`
- HPA: Skaliert Worker je nach CPU-Auslastung

## Testen
- Tasks: `pytest worker/tests`
- Manuelles Triggern: siehe CLI-Befehle im Projekt
