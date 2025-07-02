# onboarding.md

## Onboarding-Runbook

### 1. Zugang & Setup
- Git-Repo-Zugang, Secrets, Onboarding-Channel (Slack/Teams)
- Lokale Umgebung: Node, Python, Docker, Flutter, Rust, Go

### 2. Projektstruktur & Architektur
- Siehe `architecture.md`, `devops.md`, `deployment.md`

### 3. Build & Start
- Backend: `npm install && npm run start:dev`
- Frontend: `npm install && npm start`
- Mobile: `flutter pub get && flutter run`

### 4. Datenbank & Seed
- Migration: `npx prisma migrate deploy`
- Seed: `npx ts-node database/seeders/seed_wallet_demo_user.ts`

### 5. Tests & Monitoring
- Tests: `npm test`, `pytest`, `playwright test`
- Monitoring: Prometheus, Grafana Dashboards

### 6. Doku & Support
- Siehe `docs/`, Confluence, Backstage, Slack/Teams

---

**Fragen?** → Onboarding-Channel oder dev@kileifer.de
