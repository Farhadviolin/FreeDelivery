import React, { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_RESTAURANT_API ?? 'http://localhost:4001/api/restaurants';

export default function ApiTest() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Backend-API Test</h1>
      <p>GET <code>{API_URL}</code></p>
      {error && <div style={{ color: 'red' }}>Fehler: {error}</div>}
      <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 8 }}>
        {data ? JSON.stringify(data, null, 2) : 'Lade...'}
      </pre>
    </div>
  );
}
