# UI/UX Polish & Admin-UI Hinweise

## UI/UX Polish
- Konsistente Farbpalette und Typografie (Design Tokens)
- Responsive Layouts für alle Devices
- Animationsdauer < 200ms, keine ablenkenden Effekte
- Loading- und Error-States für alle Async-Operationen
- User-Feedback: Toasts, Modals, Progress-Indicators
- Dark Mode und High Contrast Mode
- Barrierefreie Komponenten (siehe Accessibility-Checkliste)

## Admin-UI
- Übersichtliche Dashboards (Orders, Restaurants, Fahrer, SLA)
- Filter, Suche, Bulk-Aktionen
- Rollenbasierte Navigation (RBAC)
- Audit-Log-Viewer und Incident-Panel
- Partner-Management (API-Keys, Usage, Fraud Alerts)
- SLA- und Monitoring-Widgets

## Tools & Frameworks
- React (MUI, Chakra UI, Ant Design)
- Storybook für Komponenten-Doku
- Cypress/E2E-Tests für Admin-Workflows

## Hinweise
- Siehe `frontend/admin-panel/` und `docs/dev-guides/accessibility_checklist.md`
- UI/UX-Reviews regelmäßig durchführen
