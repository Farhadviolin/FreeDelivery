# architecture.md

## Architekturübersicht

Das Multi-Restaurant-Delivery-System besteht aus modularen Microservices, modernen Frontends, Mobile Apps, DevOps- und Security-Komponenten.

### Hauptkomponenten
- API-Gateway, Auth, Order, Payment, Notification, Analytics, Rating, Recommendation, Chatbot, Dispatch, Restaurant, Driver, Customer
- Frontend: Customer-Portal, Admin-Panel, Partner-Portal
- Mobile: Flutter-Apps für Customer & Driver, React Native Admin
- DevOps: CI/CD, Monitoring, Self-Healing, SLA, Backup, Security
- Cloud: Multi-Cloud, Kubernetes, Istio, Argo CD, Vault, Prometheus, Grafana

### Architekturdiagramm
![Architekturdiagramm](architecture/architecture_diagram.png)

### Schnittstellen
- REST, gRPC, WebSocket, MQTT, Webhooks

### Erweiterbarkeit
- Partner-Ökosystem, SDKs, Sandbox, API-Explorer

---

Siehe auch: `deployment.md`, `security.md`, `devops.md`
