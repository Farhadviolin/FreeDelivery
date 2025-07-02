# Crypto & Privacy Monitoring

## Prometheus Metriken
- `crypto_ops_total{type}`: Anzahl Crypto-Operationen (encrypt, decrypt, sign, verify)
- `crypto_errors_total{type}`: Fehler bei Crypto-Operationen
- `crypto_latency_ms{type}`: Latenz pro Crypto-Operation

## Alerts (crypto_alerts.yaml)
- **CryptoErrorRateHigh**: Fehlerquote >1% in 5 Minuten
- **CryptoLatencyHigh**: Latenz >100ms im Schnitt

## Audit & Zero-Trust-Logs
- Beispiel: `security/audits/zero_trust_audit_log.py`
- Loggt alle Crypto-Events mit User, Typ, Status, Metadaten
- Audit-Logs regelmäßig sichern und auf Integrität prüfen

## Compliance
- Nachweis der E2EE und Privacy-Mechanismen über Audit-Logs und Monitoring
- DSGVO/GDPR: Keine Klartextdaten auf Server, Schlüssel nur clientseitig

## Dashboards
- Grafana Panels für Crypto-Fehler, Latenz, Audit-Events

## Weiteres
- Siehe `devops/monitoring/`, `security/audits/`, `.github/workflows/e2ee.yml`
