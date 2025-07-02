import { useState } from 'react';
export default function DSARPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  async function submit() {
    const res = await fetch('/api/dsar/request', { method:'POST', body:JSON.stringify({ email }), headers:{'Content-Type':'application/json'} });
    const { token } = await res.json();
    setToken(token);
  }
  async function check() {
    const res = await fetch(`/api/dsar/status/${token}`);
    const data = await res.json();
    setStatus(data.status);
  }
  return (
    <div>
      <h1>DSAR-Anfrage</h1>
      {!token ? (
        <>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Ihre E-Mail" />
          <button onClick={submit}>Anfrage absenden</button>
        </>
      ) : (
        <>
          <p>Ihr Token: {token}</p>
          <button onClick={check}>Status prüfen</button>
          {status && <p>Status: {status}</p>}
        </>
      )}
    </div>
  );
}
