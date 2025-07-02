# Partner-Ökosystem: API, Sandbox, Fraud Detection

## Features
- API-Explorer & Sandbox für Partner-Integration
- API-Key-Management & Key-Rotation
- Usage-Export (CSV, JSON)
- Fraud Detection & Alerts
- SDK-Publishing (Node, Python, Java)

## Einstieg
1. **API-Keys generieren**: Admin-Panel oder `/api/partner/keys`
2. **Sandbox-Umgebung nutzen**: `sandbox.kiliefer.de` (Mock-Data, keine echten Zahlungen)
3. **API-Explorer**: Swagger/OpenAPI UI (`/api/docs`)
4. **Usage-Export**: Download im Admin-Panel oder `/api/partner/usage`
5. **Fraud Detection**: Alerts im Admin-Panel, Webhooks möglich

## Security
- Key-Rotation automatisiert (siehe Vault)
- Zugriffskontrolle via RBAC
- Audit-Logs für alle Partner-Aktionen

## Monitoring & Analytics
- Prometheus-Metriken für Partner-API
- Alerts bei Anomalien (z.B. zu viele Requests, Fraud-Pattern)

## Doku & SDKs
- Siehe `docs/api-specs/`, `frontend/admin-panel/`, `backend/analytics-service/`
- SDKs: `sdk/` (Node, Python, Java)
