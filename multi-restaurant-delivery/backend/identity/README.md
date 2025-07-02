# Keycloak SSO & Identity Federation – Architekturdiagramm

```mermaid
flowchart LR
  subgraph Identity
    KC[Keycloak (IDP)]
  end
  subgraph Gateway
    KG[Kong API Gateway]
  end
  subgraph Services
    S1[User-Service]
    S2[Order-Service]
  end
  subgraph Client
    UI[Web & Mobile App]
  end

  UI -->|OIDC Auth| KC
  KC -->|JWT| UI
  UI -->|Bearer Token| KG
  KG --> S1 & S2
```
