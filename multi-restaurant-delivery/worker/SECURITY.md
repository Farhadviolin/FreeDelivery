# Security Best Practices – Worker Task System

- API-Auth: Verwende API Keys oder OAuth2 für alle Endpunkte
- Rate-Limiting: Schütze Enqueue-APIs gegen Abuse (z.B. mit Redis)
- Queue Isolation: Trenne kritische Queues (z.B. DLQ, High-Priority)
- Secrets: Nutze Kubernetes Secrets für Broker/Backend-URLs
- Monitoring: Aktiviere Alerting für Fehler, DLQ, hohe Latenz
- Dependency Scanning: Automatisiere SCA/SAST in CI/CD
- Logging: Logge alle sicherheitsrelevanten Events (Enqueue, Fehler, DLQ)
- Least Privilege: Worker-Container laufen als non-root
