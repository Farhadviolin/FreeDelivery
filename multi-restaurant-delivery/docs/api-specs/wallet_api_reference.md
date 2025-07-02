# API Reference: Wallet & NFC

## Mobile Wallet API
- NFC- und QR/Barcode-Scan-Events
- Analytics-Events (Firebase, OpenTelemetry)
- Monitoring-API (Prometheus-kompatibel)

### Endpunkte (Analytics-Service)
- `POST /api/wallet/nfc-failure` – Zählt fehlgeschlagene NFC-Scans
- `POST /api/wallet/qr-failure` – Zählt fehlgeschlagene QR/Barcode-Scans
- `POST /api/wallet/permission-denied` – Zählt abgelehnte Berechtigungen
- `GET /api/metrics` – Prometheus-Metriken

## Seed & Test
- `database/seeders/seed_wallet_demo_user.ts` – Demo-User mit Wallet
- `qa/e2e-tests/wallet.e2e.spec.ts` – End-to-End-Test für Wallet-Flow

## Hinweise
- Für produktive Nutzung Authentifizierung und Rate-Limiting aktivieren
- Monitoring- und Alerting-Regeln siehe `devops/monitoring/`
- Erweiterbar für Loyalty, Payment, Partner-APIs
