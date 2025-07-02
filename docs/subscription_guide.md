# Subscription Service – User Guide

## Übersicht
Dieses Framework ermöglicht wiederkehrende Zahlungen, flexible Pläne und Lifecycle-Management für Abonnements.

## Komponenten
- **NestJS Subscription Service:** REST/GraphQL-API für Abo-Management
- **Stripe-Integration:** Recurring Billing, Webhooks, Rechnungen
- **BullMQ:** Renewal- und Reminder-Jobs
- **PostgreSQL:** Speicherung der Abos
- **Redis:** Locking, Rate-Limits
- **Monitoring:** Prometheus/Grafana

## Nutzung
1. **Service lokal starten:**
   ```bash
   cd subscription && npm run start:dev
   ```
2. **Stripe-Webhooks testen:**
   ```bash
   stripe listen --forward-to localhost:3000/webhooks/stripe
   ```
3. **Abo via GraphQL abschließen:**
   ```graphql
   mutation {
     subscribe(priceId: "price_123", userId: "user_1")
   }
   ```
4. **Status prüfen:**
   ```graphql
   query {
     subscriptions(userId: "user_1") { id, active, currentPeriodEnd }
   }
   ```
5. **DB prüfen:**
   ```bash
   psql $DB_URL -c "select * from subscription;"
   ```

## Anpassung
- Pläne, Preise und Stripe-Keys in .env/config anpassen
- Reminder- und Kündigungs-Logik im Processor erweitern
- Monitoring/Alerts in Prometheus/Grafana konfigurieren
