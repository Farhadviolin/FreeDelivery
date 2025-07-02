# User Guide: End-to-End Encryption & Privacy

## Was ist E2EE?
End-to-End Encryption (E2EE) stellt sicher, dass nur Sender und Empfänger Daten entschlüsseln können. Schlüssel bleiben immer beim Client.

## Wie funktioniert es?
- **Client-seitige Verschlüsselung**: Daten werden im Browser/auf dem Gerät verschlüsselt (Web Crypto, OpenPGP.js)
- **Encryption Gateway**: Entschlüsselt nur im Trusted-Execution-Umfeld, Backend sieht nie Klartext
- **Vault Transit**: Schlüsselverwaltung und -rotation ohne Serverzugriff auf private Keys
- **Privacy-Preserving Computation**: Gemeinsame Analysen mit Homomorphic Encryption oder MPC, ohne Rohdaten zu teilen

## Wie nutze ich E2EE?
1. **Daten verschlüsseln**: Siehe `clientEncrypt.js` (Frontend)
2. **Daten senden**: Übertrage Ciphertext an das Gateway (`/secure`)
3. **Audit & Monitoring**: Crypto-Operationen werden geloggt und überwacht

## Sicherheitshinweise
- Private Schlüssel niemals auf dem Server speichern
- Bei Schlüsselverlust sind Daten unwiederbringlich verloren
- Audit-Logs regelmäßig prüfen

## Weitere Infos
- Siehe `docs/api-specs/`, `security/policies/`, `devops/monitoring/`
- Bei Fragen: Security-Team kontaktieren
