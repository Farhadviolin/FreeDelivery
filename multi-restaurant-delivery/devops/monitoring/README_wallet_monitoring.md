# Wallet Monitoring & Alerting

Dieses Dokument beschreibt die Prometheus-Metriken und Alert-Regeln für die Mobile Wallet-Funktionalität.

## Prometheus Metriken
- `wallet_nfc_scan_failure_total`: Fehlgeschlagene NFC-Scans
- `wallet_qr_scan_failure_total`: Fehlgeschlagene QR/Barcode-Scans
- `wallet_permission_denied_total`: Abgelehnte Berechtigungen (NFC/Kamera)

## Alerts (wallet_alerts.yaml)
- **WalletNfcScanFailure**: NFC-Scan-Fehler in den letzten 5 Minuten
- **WalletQrScanFailure**: QR/Barcode-Scan-Fehler in den letzten 5 Minuten
- **WalletPermissionDenied**: Mehr als 2 abgelehnte Berechtigungen in 2 Minuten

## Integration
- Export der Metriken aus der Mobile-App via OpenTelemetry/Collector oder Backend-API
- Alerts werden in Prometheus/Grafana angezeigt
- Eskalation via Slack, E-Mail oder PagerDuty möglich

## Erweiterung
- Weitere Metriken für Payment, Loyalty, User-Feedback etc. möglich
- Dashboards in Grafana für Wallet-Health und User-Flow
