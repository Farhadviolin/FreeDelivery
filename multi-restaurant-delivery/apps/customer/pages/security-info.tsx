import React from 'react';
import Protected from '../components/Protected';
import Link from 'next/link';

export default function SecurityInfo() {
  return (
    <Protected>
      <div>
        <h2>Security & Privacy</h2>
        <ul>
          <li>Alle Passwörter werden sicher gehasht gespeichert (SHA256, Demo).</li>
          <li>JWT-Token für Authentifizierung, keine sensiblen Daten im Token.</li>
          <li>Alle API-Routen sind durch Auth und Rollen geschützt.</li>
          <li>Frontend/Backend CORS-Policy aktiv.</li>
          <li>CI/CD: Snyk, Bandit, Checkov, Gitleaks, SonarCloud für Security-Checks.</li>
          <li>Keine sensiblen Daten im Frontend-Code.</li>
          <li>Demo: DSGVO-konforme Datenlöschung auf Anfrage möglich.</li>
          <li>
            <Link href="/2fa">2FA (Two-Factor Authentication)</Link>
          </li>
          <li>
            <Link href="/sentry-demo">Sentry Demo (Frontend Error)</Link>
          </li>
          <li>
            <Link href="/gdpr">DSGVO / GDPR: Datenexport, Account-Löschung, Consent</Link>
          </li>
        </ul>
        <p>
          Für produktive Systeme: 2FA, Rate-Limiting, CSP, Secure Cookies,
          Secrets-Management, Monitoring, Logging, regelmäßige Pen-Tests.
        </p>
        <p>
          <b>API Security:</b> Rate-Limiting, Security-Header, 2FA, Pen-Test-Check,
          Gitleaks, Bandit, Snyk, SonarCloud
        </p>
        <p>
          <b>Monitoring & Logging:</b> Prometheus /metrics, ELK-ready Logging, Sentry (Backend & Frontend)
        </p>
      </div>
    </Protected>
  );
}
