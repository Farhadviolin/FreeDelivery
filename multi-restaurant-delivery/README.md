# Multi-Restaurant-Delivery-System

Dieses Monorepo enthält alle Module und Services für unser Multi-Restaurant-Liefersystem:
- Architektur & Design
- Frontend (Customer Portal, Admin Panel, Driver Web)
- Backend-Services (Auth, Orders, Dispatch, Payment u.v.m.)
- Mobile Apps (Flutter & React Native)
- DevOps, CI/CD, Monitoring, Security, ML/AI, u.v.a.

## Internationalisierung (i18n) & Lokalisierung

- **Frontend:**
  - Mehrsprachigkeit via `react-i18next` (locales/{de,en,fr}/common.json)
  - Sprachumschaltung, Übersetzungs-Loader, Formatierungs-Utils (`formatCurrency`, `formatDate`)
  - CI-Check: `node scripts/i18n-check.js` prüft Übersetzungsabdeckung
- **Mobile:**
  - Flutter Intl mit ARB-Dateien, Sprachumschaltung in App
- **Backend:**
  - i18next-Express-Middleware für mehrsprachige Fehlermeldungen
- **Workflow:**
  - Übersetzungs-Keys via i18next-parser extrahieren
  - CI prüft, dass alle Keys in allen Sprachen vorhanden sind

Beispiel-Formatierung:
```ts
import { formatCurrency, formatDate } from 'frontend/common/utils/format';
formatCurrency(1234.56, 'de-DE', 'EUR'); // "1.234,56 €"
formatDate(new Date(), 'fr-FR'); // "30 juin 2025 à 14:00"
```

## Feature-Flags & A/B-Testing

- **Backend:**
  - Feature-Flag-Service (LaunchDarkly/Unleash) mit `/flags/:userKey`-Endpoint
  - Flags für neue Features (z.B. `new-checkout-flow`, `menu-search-beta`)
- **Frontend:**
  - SDK-Integration, React-Hook für Flags, dynamisches Umschalten von Komponenten
  - Beispiel: Checkout-Komponente rendert je nach Flag NewCheckout oder LegacyCheckout
- **A/B-Experiment:**
  - Traffic-Split, Conversion-Tracking pro Variante
  - Rollout-Strategien: Prozentual, User-Targeting, Canary
- **Testing:**
  - Unit- und Integrationstests für Flag-Endpoint und Komponenten-Rendering
- **Monitoring:**
  - Event-Tracking (z.B. Segment, Amplitude) für Conversion/Engagement

Beispiel-Flag-Usage:
```ts
import { useFlags } from '../featureFlags';
const { data: flags } = useFlags();
if (flags?.newCheckoutFlow) {
  // ...
}
```

## Data Governance & Compliance-Audit

- **Audit-Logging:**
  - PostgreSQL-Trigger für alle kritischen Tabellen (Orders, Payments, Users, Reviews)
  - Zentrale Audit-Logs in Elasticsearch, Visualisierung via Kibana
- **Compliance-Service:**
  - Policy-Checks via OPA (Open Policy Agent) und Node.js-Microservice
  - Endpoint `/compliance/check` prüft Zugriffe und Aktionen gegen Policies
- **Data Catalog & Lineage:**
  - Metadaten-Export (z.B. `database/metadata/orders.json`) für Atlas/Glue
  - Upstream/Downstream, Datenklassifizierung (PII, Sensitive, Public)
- **Data Quality:**
  - Great Expectations-Suites für Kern-Tabellen, regelmäßige Validierung in CI
- **CI/CD:**
  - OPA-Policy-Tests, Data Quality-Checks, Catalog-Validierung als eigene Jobs
- **Consent Management:**
  - Consent-Status in user_consent-Tabelle, Policy-Prüfung bei Zugriff

Beispiel-Policy-Check:
```ts
POST /compliance/check
{
  resource: 'orders',
  action: 'READ',
  user: { role: 'user' },
  dataClass: 'PII'
}
// → 403 Forbidden, wenn Policy verletzt
```

Beispiel-Metadaten-Export:
```json
{
  "entity": "orders",
  "fields": [
    { "name": "user_id", "class": "PII" },
    { "name": "total_amount", "class": "sensitive" }
  ],
  "upstream": ["api-gateway"],
  "downstream": ["analytics-service"]
}
```

## Skalierung & High Availability

- **Kubernetes:**
  - Multi-Zonen-Cluster, Ingress-Controller (NGINX/Traefik), stateless Microservices
  - Horizontal Pod Autoscaling (HPA) für alle Services, Ressourcenlimits & PodAntiAffinity
- **Stateful Services:**
  - PostgreSQL mit Patroni-Operator (3+ Instanzen, automatisches Failover)
  - Redis Cluster mit Sentinel, RabbitMQ Cluster via Helm
- **Health Checks:**
  - Liveness/Readiness-Probes für alle Deployments, Self-Healing durch K8s
- **GitOps:**
  - ArgoCD für automatisches Syncen, Self-Healing und Rollbacks
- **Disaster Recovery:**
  - Regelmäßige Backups (Postgres WAL, Redis Snapshots), Restore-Playbooks dokumentiert
- **Monitoring:**
  - Prometheus Operator, Grafana Dashboards für Cluster, DB, Queues

Beispiel-Helm-Values für HPA & Affinity:
```yaml
replicaCount: 2
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
podAntiAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchExpressions:
          - key: app
            operator: In
            values: ["order-service"]
      topologyKey: "kubernetes.io/hostname"
```

Disaster Recovery:
- Postgres: WAL-Archiving, Point-in-Time-Restore, regelmäßige Dumps
- Redis: RDB/AOF-Snapshots, Cluster-Resync
- Dokumentierte Restore- und Failover-Prozesse

## Multi-Tenancy & Mandantenfähigkeit

- **Tenant-Entity:**
  - `tenants`-Tabelle, Zuordnung von Usern, Restaurants, Orders zu Tenant
- **Tenant-Scoping:**
  - Middleware (`tenantMiddleware.ts`) extrahiert Tenant-ID aus Header/Subdomain/JWT
  - Alle Backend-Endpoints und DB-Queries werden auf aktiven Tenant gescoped
- **Mandantenkonfiguration:**
  - Branding, Features, Limits pro Tenant (z.B. `brandingColor`, `logoUrl`)
- **Frontend:**
  - Mandantenkontext im State, dynamisches Branding/Theming
- **Test-Strategie:**
  - Tests für Isolation, keine Datenlecks zwischen Tenants

Beispiel-Middleware:
```ts
// tenantMiddleware.ts
export function tenantMiddleware(req, res, next) {
  const tenantId = req.headers['x-tenant-id'];
  if (!tenantId) return res.status(400).json({ error: 'Missing tenant id' });
  req.tenantId = tenantId;
  next();
}
```

## Security Hardening & Penetration-Testing

- **Dependency-Scanning:**
  - Snyk/Dependabot für Node, Container, Terraform
- **Container-Scanning:**
  - Trivy für Images, IaC
- **DAST:**
  - OWASP ZAP Baseline-Scan in CI, manuelle Pen-Tests
- **Kubernetes Security:**
  - OPA Gatekeeper Constraints (z.B. runAsNonRoot, readOnlyRootFilesystem)
  - TLS 1.2+ mit sicheren Cipher Suites, Cert-Manager für Zertifikate
- **CI/CD Security Gates:**
  - Security-Workflow als Gate für Deployments (nur bei 0 Critical Findings)
- **Vulnerability Management:**
  - Automatisierte Alerts, Patch-Management, regelmäßige Policy-Reviews
- **Penetration-Testing:**
  - Jährliche externe Audits, ZAP-Reports, Issues für Findings

Beispiel-GitHub-Workflow:
```yaml
name: Security Checks
on: [push, pull_request]
jobs:
  dependency-scanning:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Snyk test
        uses: snyk/actions/node@master
        with:
          args: test
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  container-scanning:
    runs-on: ubuntu-latest
    steps:
      - uses: aquasecurity/trivy-action@v0.9.0
        with:
          scan-type: 'image'
          image-ref: ghcr.io/${{ github.repository_owner }}/${{ matrix.service }}:${{ github.sha }}
  dast-scan:
    runs-on: ubuntu-latest
    needs: dependency-scanning
    steps:
      - uses: actions/checkout@v3
      - name: Start application
        run: docker-compose up -d --build
      - name: OWASP ZAP Baseline Scan
        uses: zapbot/zap-baseline@v0.1.0
        with:
          target: 'http://localhost:3000'
          rules_file_name: 'zap-rules.json'
```

Beispiel-Gatekeeper-Constraint:
```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8sallowedpsp
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedPSP
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8sallowedpsp
        violation[{"msg": msg}] {
          input.review.object.spec.containers[_].securityContext
          not input.review.object.spec.containers[_].securityContext.runAsNonRoot
          msg := "Containers must run as non-root"
        }
```

## Observability & Incident Response

- **SLOs/SLIs:**
  - Verfügbarkeit, Latenz, Fehlerquote für alle Kernservices (API, Payment, Notification, Dispatch, DB)
  - Beispiel: 99.9% API-Uptime, <500ms Median-Response
- **Prometheus Alerting:**
  - Alerts für Error-Rate, Latenz, CPU/Mem, Queue-Backlog, DB-Replication-Lag
  - Beispiel-Alert:
    ```yaml
    - alert: HighErrorRate
      expr: sum(rate(http_requests_total{status=~"5.."}[5m])) by (service) > 0.05
      for: 5m
      labels: { severity: "critical" }
      annotations:
        summary: "High error rate (>5%) detected"
    ```
- **Grafana Dashboards:**
  - Standard-Dashboards für API, DB, Queues, Mobile, Frontend
- **Runbooks:**
  - Incident-Response-Playbooks im Repo (z.B. `docs/runbooks/incident.md`)
  - Beispiel: "API down" → Check Ingress, Pod, DB, Rollback, Notify
- **Alert Routing:**
  - Alerts an Slack, PagerDuty, E-Mail
- **Postmortems:**
  - Template für Root Cause Analysis, Lessons Learned
