import { useState } from 'react';
import axios from 'axios';

export default function PartnerPortal() {
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  async function fetchToken() {
    const res = await axios.post('/api/token', { key, secret });
    setToken(res.data.access_token);
  }
  return (
    <div className="p-8">
      <h1>Partner Onboarding</h1>
      <input placeholder="API Key" onChange={e=>setKey(e.target.value)} />
      <input placeholder="API Secret" onChange={e=>setSecret(e.target.value)} />
      <button onClick={fetchToken}>Token generieren</button>
      {token && <pre>{token}</pre>}
    </div>
  );
}
