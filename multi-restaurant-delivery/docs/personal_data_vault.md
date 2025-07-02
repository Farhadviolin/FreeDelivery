# Personal Data Vault & Data Privacy – Quickstart

## Komponenten
- **Vault Transit Engine**: Encryption-as-a-Service für PII
- **Vault-Proxy (FastAPI)**: API für Verschlüsselung/Entschlüsselung
- **PDV DB**: Separate Tabelle für verschlüsselte Nutzdaten
- **Middleware**: Clientseitige Verschlüsselung/Entschlüsselung
- **Consent-UI**: Einwilligungsmanagement (Next.js)
- **Airflow DAG**: Automatisierte Löschzyklen
- **OPA Policy**: Feingranulare Zugriffskontrolle

## Workflows
- App → Vault-Proxy → PDV DB (verschlüsselt)
- Consent-Änderung → Kafka Event → Airflow Erasure DAG
- Zugriffskontrolle via OPA Policy

## Testen
- Vault-Proxy: `pytest vault_proxy/tests`
- Middleware: `npm test --workspace=middleware`
- OPA Policy: `opa test policies`

## CI/CD
- Siehe `.github/workflows/ci-personal-data-vault.yml` für automatisierte Tests & Deployments

## Hinweise
- Vault, DB, OPA, Airflow und API-Endpunkte ggf. anpassen
- DSGVO/CCPA-konforme Prozesse und Audit-Logs beachten
