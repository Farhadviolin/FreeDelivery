# KiLiefer – Multi-Restaurant-Delivery-Plattform

## Features
- Kunden-, Restaurant-, Fahrer-, Admin-Portal
- Auth, Menü, Bestellung, Payment, Review, Notification, DSGVO, Monitoring
- CI/CD, Security, Blue/Green, Mandantenfähig, Policy-Engine, Analytics, KI

## Quickstart
- `yarn install && yarn dev` (Frontend)
- `uvicorn backend/api-gateway/api/main:app --reload` (Backend)
- `yarn test:e2e` (E2E)
- `locust -f e2e/locustfile.py` (Load)

## Doku
- [API](./API.md)
- [Architektur](./ARCHITECTURE.md)
- [DevOps](./DEVOPS.md)
- [Security](./SECURITY.md)
