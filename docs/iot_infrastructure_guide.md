# IoT-Infrastruktur – User Guide

## Übersicht
Dieses System ermöglicht die sichere Vernetzung, Überwachung und Steuerung von Smart-Kitchen-Geräten (Sensoren, Gateways, Cloud).

## Komponenten
- **Device Provisioning (Python):** Automatisiertes Onboarding und Zertifikatsmanagement
- **Edge Gateway (Docker Compose):** Mosquitto (MQTT), Telegraf (Daten-Streaming)
- **Telegraf Config:** MQTT → InfluxDB Routing
- **AWS IoT Rule:** MQTT-Events → InfluxDB
- **Management API (FastAPI):** Übersicht und Verwaltung der Devices
- **CI/CD:** Automatisierte Tests, Edge-Builds, API-Deployments

## Nutzung
1. **Device Provisioning:**
   ```bash
   python scripts/register_device.py
   ```
2. **Edge Gateway starten:**
   ```bash
   cd edge && docker-compose up -d
   ```
3. **Sensor-Daten simulieren:**
   ```bash
   mosquitto_pub -h localhost -t kitchen/oven001/sensor -m '{"temperature":200,"humidity":30}'
   ```
4. **InfluxDB abfragen:**
   ```bash
   influx bucket query -b kitchen_metrics 'from(bucket:"kitchen_metrics")|> range(-5m)'
   ```
5. **IoT API testen:**
   ```bash
   uvicorn iot.api:app --reload --port 8000
   curl http://localhost:8000/devices
   ```
6. **CI/CD-Workflow:**
   - Siehe `.github/workflows/ci-iot-infrastructure.yml`

## Anpassung
- Device-Typen, Topics und Security-Policies in AWS IoT anpassen
- Edge- und Cloud-Monitoring in Grafana konfigurieren
- Firmware-Updates und Rollen-Management ergänzen
