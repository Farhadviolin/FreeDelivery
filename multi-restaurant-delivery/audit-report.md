# Audit-Report: Stubs, TODOs, leere Methoden, throw new Error

| Datei | Zeile | Gefundener Stub | Kontext |
|-------|-------|----------------|---------|
| backend/promo-service/src/services/PromoService.ts | 18 | throw new Error('Invalid or expired code') | Validierung Promo-Code |
| backend/promo-service/src/services/PromoService.ts | 20 | throw new Error('Campaign not found') | Kampagne nicht gefunden |
| backend/promo-service/src/services/PromoService.ts | 22 | throw new Error('Order amount too low') | Mindestbestellwert |
| backend/loyalty-integration-service/src/instrumentation.ts | 12 | // TODO: HTTP, Redis, TypeORM, BullMQ Instrumentation | Instrumentierung fehlt |
| backend/auth-service/src/index.ts | 62 | throw new Error('Ungültiger Refresh-Token') | Token-Validierung |
| backend/inventory-service/src/inventory.service.ts | 22 | throw new Error('Insufficient stock') | Lagerbestand |
| backend/api-gateway/src/vaultClient.go | 15 | // TODO: return decodedKey | Go-Stub |
| backend/loyalty-integration-service/src/loyalty.service.ts | 29 | throw new Error('No valid partner config') | Partner-Konfiguration |
| backend/loyalty-integration-service/src/sentry.ts | 21 | function setSentryUserContext(userId: string, meta: Record<string, any> = {}) { } | Leere Funktion |

Weitere Stubs, leere Methoden und ungenutzte Exporte können automatisiert mit ESLint und AST-Checks gefunden werden.

**Nächster Schritt:**
- Ersetze alle gefundenen Stubs/TODOs/leere Methoden durch realistische Implementierungen und ergänze passende Tests.
- Dokumentiere jede Änderung direkt im Code und ergänze diesen Report.
