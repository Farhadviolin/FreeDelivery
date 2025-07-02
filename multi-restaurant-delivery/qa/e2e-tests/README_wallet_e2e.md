# End-to-End Test & Seed für Wallet-Flow

## E2E-Test (Playwright)
- Datei: `qa/e2e-tests/wallet.e2e.spec.ts`
- Testet Wallet-UI, NFC- und QR/Barcode-Flow (Mock/Stub für echte Hardware nötig)
- Ausführung: `npx playwright test qa/e2e-tests/wallet.e2e.spec.ts`

## Seed-Skript für Demo-User
- Datei: `database/seeders/seed_wallet_demo_user.ts`
- Legt einen Demo-User mit Wallet an (Prisma)
- Ausführung: `npx ts-node database/seeders/seed_wallet_demo_user.ts`

## Hinweise
- Für echte NFC/QR-Tests sind Mocks oder Emulatoren nötig
- Seed-Skript kann für weitere User/Wallets erweitert werden
- E2E-Tests können in CI/CD integriert werden
