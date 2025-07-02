# Wallet & NFC Integration

Diese Komponente bietet Wallet-Funktionalität mit NFC- und QR/Barcode-Scan für die Flutter-Customer-App.

## Features
- NFC-Scan (inkl. Permissions-Handling)
- QR/Barcode-Scan als Fallback (inkl. Kamera-Permission)
- Analytics-Events für alle Scan-Aktionen (Firebase Analytics)
- UI/UX für Wallet-Flow
- Integrationstest für Permissions und UI

## Dateien
- `lib/wallet/wallet_screen.dart`: Haupt-UI und Logik
- `lib/wallet/wallet_analytics.dart`: Analytics-Events
- `test/wallet/wallet_screen_test.dart`: Integrationstest

## Nutzung
1. Abhängigkeiten in `pubspec.yaml` ergänzen:
   - permission_handler
   - nfc_manager
   - qr_code_scanner
   - firebase_analytics
2. `WalletScreen()` in die App einbinden.
3. Firebase Analytics konfigurieren (siehe Firebase-Doku).

## Hinweise
- Für echte Geräte-Tests werden reale Berechtigungen und Hardware benötigt.
- Analytics-Events können im Firebase Dashboard ausgewertet werden.
- Erweiterbar für Loyalty, Payment, u.v.m.
