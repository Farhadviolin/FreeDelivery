import React from 'react';

export default function SentryDemo() {
  const throwError = () => {
    // Simuliert einen Fehler für Sentry-Demo
    throw new Error('Sentry Frontend Test Error');
  };
  return (
    <div>
      <h2>Sentry Demo</h2>
      <button onClick={throwError}>Trigger Frontend Error</button>
      <p>Dieser Fehler wird an Sentry gemeldet (wenn Sentry im Frontend aktiviert ist).</p>
    </div>
  );
}
