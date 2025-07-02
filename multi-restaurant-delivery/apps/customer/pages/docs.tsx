import React from 'react';
import Protected from '../components/Protected';

export default function DocsPage() {
  return (
    <Protected>
      <div>
        <h2>Dokumentation & Hilfe</h2>
        <ul>
          <li>Alle Kernfunktionen sind im Menü links erreichbar.</li>
          <li>Jede Rolle (Kunde, Fahrer, Restaurant, Admin) hat eigene Ansichten und Rechte.</li>
          <li>Bestellungen, Menü, Bewertungen, Status, Notifications und Security sind voll integriert.</li>
          <li>CI/CD, Tests, Security-Checks und Doku laufen automatisiert.</li>
          <li>Für Entwickler: Storybook für UI, Typedoc/pdoc für Code-Doku, Playwright für E2E-Tests.</li>
          <li>Support: Bei Fragen oder Problemen bitte an das DevOps-Team wenden.</li>
        </ul>
        <p>Diese Plattform ist modular erweiterbar und folgt modernen DevOps- und Security-Standards.</p>
      </div>
    </Protected>
  );
}
