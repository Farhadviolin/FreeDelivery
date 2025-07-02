# Onboarding Guide: Multi-Restaurant-Delivery Monorepo

## Übersicht
Dieses Repository enthält Backend, Frontend, Mobile, DevOps, Analytics und Partner-Ökosystem für ein Multi-Restaurant-Liefersystem.

## Getting Started
1. **Repository klonen**
2. **.env-Dateien anlegen** (siehe `docs/dev-guides/env.example`)
3. **Datenbank migrieren & seedn**
   - `npx prisma migrate deploy`
   - `npx ts-node database/seeders/seed_wallet_demo_user.ts`
4. **Backend starten**
   - `cd backend/api-gateway && npm install && npm run start:dev`
5. **Frontend starten**
   - `cd frontend/customer-portal && npm install && npm start`
6. **Mobile App starten**
   - `cd mobile/flutter-customer-app && flutter pub get && flutter run`
7. **Monitoring & Analytics**
   - Prometheus, Grafana, OpenTelemetry Collector starten (siehe `devops/monitoring/README_wallet_monitoring.md`)
8. **E2E-Tests ausführen**
   - `npx playwright test qa/e2e-tests/wallet.e2e.spec.ts`

## Dokumentation
- API-Referenz: `docs/api-specs/`
- Dev-Guides: `docs/dev-guides/`
- User-Guides: `docs/user-guides/`
- Monitoring: `devops/monitoring/`

## Security & Compliance
- Secrets via Vault (`devops/terraform/vault/`)
- Audit-Logs, PenTests, Compliance-Reports (`security/`)
- Backup/Restore: `devops/monitoring/`, `devops/terraform/velero/`

## Partner-Ökosystem
- API-Explorer, Sandbox, SDKs: `docs/api-specs/`, `frontend/admin-panel/`
- Key-Rotation, Usage-Export, Fraud Detection: `backend/analytics-service/`, `security/`

## Support
- Siehe `docs/` und interne Slack/Teams-Kanäle
