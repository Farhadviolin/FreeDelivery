import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [params] = useSearchParams();
  useEffect(() => {
    // Send UTM event to analytics
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'qr_landing',
      campaign: params.get('utm_campaign'),
      id: params.get('utm_id'),
    });
  }, []);
  return (
    <div className="p-4">
      <h1>Willkommen zur {params.get('utm_campaign')} Aktion!</h1>
      <button onClick={() => alert('Gutschein aktiviert!')}>
        Gutschein einlösen
      </button>
    </div>
  );
}
