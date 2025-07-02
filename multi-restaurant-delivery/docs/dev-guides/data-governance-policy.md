# Data Governance & Compliance Policy Template

## 1. Datenklassifizierung
- **PII:** Personenbezogene Daten (z.B. Name, E-Mail, Adresse)
- **Sensitive:** Zahlungsdaten, Authentifizierungsdaten
- **Public:** Marketingtexte, Menüs

## 2. Retention Policy
- PII: max. 90 Tage nach Account-Löschung
- Bestelldaten: 10 Jahre (gesetzlich)
- Logs: 180 Tage

## 3. Masking & Access
- Maskierung von PII in Logs und Exports
- Zugriff nur für autorisierte Rollen (RBAC)
- Zugriffskontrolle via Immuta/Privacera

## 4. Audit-Trails
- Alle Datenzugriffe und Änderungen werden geloggt (ELK)
- Audit-Logs 2 Jahre aufbewahren

## 5. Compliance Checks
- GDPR: Recht auf Auskunft, Löschung, Datenportabilität
- PCI-DSS: Keine Speicherung von Kreditkartendaten im Klartext
- SOC2: Zugriffskontrolle, Monitoring, Incident Response

## 6. Data Catalog & Lineage
- Alle Tabellen und Felder im Atlas/DataHub dokumentieren
- Lineage-Graph für kritische Datenflüsse pflegen

---
Letzte Aktualisierung: 2025-07-01
