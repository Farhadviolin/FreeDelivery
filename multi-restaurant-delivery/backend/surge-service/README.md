# Real-Time Surge-Pricing Engine – Architekturdiagramm

```mermaid
flowchart LR
  DemandProducer[Order Volume Stream] --> Kafka[orders]
  Kafka --> SurgeService[NestJS Microservice]
  SurgeService --> Redis[Current Surge Rates]
  SurgeService --> PostgreSQL[Surge-Log]
  API Gateway -->|surgeRate| SurgeService
  Frontend -->|Display| API Gateway
```
