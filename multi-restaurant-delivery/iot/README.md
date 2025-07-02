# Smart Kitchen IoT Infrastruktur

## Schnellstart

1. Terraform-Setup für AWS IoT Core:
   ```bash
   cd iot/terraform
   terraform init
   terraform apply -auto-approve iot.tf
   ```
2. Edge-App vorbereiten:
   - Zertifikate und Keys in `iot/edge/` ablegen
   - Python-Abhängigkeiten installieren:
     ```bash
     pip install -r requirements.txt
     ```
   - App starten:
     ```bash
     python app.py
     ```
3. Device-Simulation:
   ```bash
   python test_device_sim.py
   ```
4. Greengrass-Deployment:
   ```bash
   aws greengrassv2 create-deployment --cli-input-json file://iot/greengrass/deployment.json
   ```

## Monitoring & Alerts
- Grafana Dashboard: `grafana/iot_dashboard.json`
- Prometheus Alerting: `grafana/alerting/iot_alerts.yml`
