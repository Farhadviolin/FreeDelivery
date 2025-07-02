# End-to-End Testing & Validation Framework

## Komponenten
- **Cypress**: Web E2E
- **Playwright**: Cross-Browser & API
- **Detox**: React Native Mobile
- **WireMock**: Service-Virtualisierung
- **Testcontainers**: Isolierte Testumgebungen
- **Allure**: Test-Reporting

## Ausführung
- Testumgebung starten: `docker-compose -f test/docker-compose.yml up -d`
- Cypress: `npx cypress open`
- Playwright: `npx playwright test`
- Detox: `npx detox test --configuration ios.simulator`
- Allure Report: `allure generate e2e/allure-results --clean -o e2e/allure-report && allure open e2e/allure-report`

## Data-Driven
- Beispiel-Userdaten: `e2e/fixtures/users.json`

## Service-Virtualisierung
- WireMock-Konfiguration: `test/wiremock-config.json`

## CI/CD
- Siehe `.github/workflows/e2e.yml` für automatisierte Ausführung
