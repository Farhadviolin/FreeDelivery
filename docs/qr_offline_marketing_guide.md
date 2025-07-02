# QR & Offline Marketing – User Guide

## Übersicht
Dieses System verbindet physische Werbung (z. B. Plakate, Flyer) mit der digitalen Plattform via QR-Codes, Tracking und Attribution.

## Komponenten
- **QR-Service (NestJS):** Kampagnen- und QR-Code-Generierung
- **Tracking-API (FastAPI):** Scan-Logging, Redis-Cache, Batch-Push zu HubSpot/Braze
- **PostgreSQL:** Speicherung von Kampagnen und Scans
- **Dashboard (Next.js):** Reporting und Attribution
- **Monitoring:** Prometheus/Grafana, Alerts bei Scan-Spikes und API-Ausfällen

## Nutzung
1. **DB Migration:**
   ```bash
   psql $DB_URL -f migrations/164_qr.sql
   ```
2. **QR-Service starten:**
   ```bash
   cd qr-service && npm run start:dev
   ```
3. **Tracking-API starten:**
   ```bash
   uvicorn tracking.main:app --reload
   ```
4. **Kampagne anlegen & QR generieren:**
   - POST /campaign/create mit Kampagnen-Details
5. **Scan simulieren:**
   ```bash
   curl http://localhost:8000/r/<campaign_id>
   ```
6. **Batch-Push zu HubSpot/Braze:**
   ```bash
   curl -X POST http://localhost:8000/batch_push_hubspot
   ```
7. **Dashboard öffnen:**
   ```bash
   cd dashboard && npm run dev
   ```

## Anpassung
- HubSpot/Braze-API-Integration in tracking/main.py ergänzen
- Scan-Metriken und Alerts in Prometheus/Grafana konfigurieren
- Weitere Kampagnen-Parameter und QR-Designs im QR-Service
