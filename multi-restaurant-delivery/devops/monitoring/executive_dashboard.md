# executive_dashboard.md

## Executive Dashboard & Corporate-Reporting

### 1. Key Metrics & KPIs
- Umsatz, Bestellungen, Auslieferzeiten, SLA-Compliance
- Top-N Restaurants, Regionenvergleich, Wachstumstrends

### 2. Dashboards & Self-Service
- Grafana Executive Panels
- Next.js Intranet-Portal (`/executive`)
- Tableau/Power BI für Enterprise-Reporting
- Metabase/Superset für Ad-hoc-Analysen

### 3. Automatisierte Reports
- Airflow DAG erzeugt monatlichen PDF-Report (`executive_report.py`)
- Download-Link im Portal, Speicherung in S3/NetShare

### 4. Data Governance
- Zugriff via SSO (Keycloak), RBAC für Berichte
- Audit-Logs für Report-Downloads

### 5. CI/CD & Tests
- Workflow: `.github/workflows/executive_dashboard.yml`
- API- und Report-Tests, DB-Migrationen

---

Siehe auch: `database/migrations/kpis_monthly_summary.sql`, `devops/airflow/dags/`, `frontend/admin-panel/pages/executive.tsx`, `frontend/admin-panel/pages/api/kpis.ts`
