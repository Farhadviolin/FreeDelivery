# Executive Dashboard & Reporting

## Übersicht
Dieses Dashboard bietet Management und Stakeholdern eine zentrale Übersicht über alle relevanten KPIs (Umsatz, Bestellvolumen, Fahrer-Performance, Kundenwachstum) sowie interaktive Drill-Down- und Reporting-Funktionen.

## Features
- KPI-Visualisierung mit Self-Service-Filtern (Region, Restaurant, Zeitraum)
- Automatisierte PDF-Reports per E-Mail (SMTP/SendGrid)
- Monitoring & Alerts (Prometheus/Grafana)
- Datenintegration aus Finance, Marketing, Operations

## Nutzung
1. Dashboard lokal starten:
   ```bash
   cd portal && npm run dev
   ```
2. ETL/dbt ausführen:
   ```bash
   dbt run --models kpis
   dbt test --models kpis
   ```
3. Analytics-API starten:
   ```bash
   npm run dev:analytics
   ```
4. Report generieren und versenden:
   ```bash
   python scripts/generate_report.py
   ```

## Monitoring
- Alerts siehe `devops/monitoring/prometheus/executive_dashboard_alerts.yml`

## Anpassung
- SMTP/SendGrid-Settings in Umgebungsvariablen setzen (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`)
- Weitere Filter und KPIs im Dashboard und Cube.js-Schema ergänzen
