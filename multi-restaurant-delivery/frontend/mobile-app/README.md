# Mobile Crash-Reporting & Monitoring – Architekturdiagramm

```mermaid
flowchart LR
  MobileApp -->|Crash| SentryAPI
  SentryAPI --> SentryDB[(Events)]
  SentryUI[Browser Dashboard] --> SentryDB
  CI/CD -->|Releases| SentryInterop
```
