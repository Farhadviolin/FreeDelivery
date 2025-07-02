import React, { useState } from 'react';
import Protected from '../components/Protected';

export default function GDPRPage() {
  const [data, setData] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [consent, setConsent] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const exportData = async () => {
    const res = await fetch('/api/gdpr/export', { headers: { Authorization: `Bearer ${token}` } });
    setData(await res.json());
  };
  const deleteAccount = async () => {
    const res = await fetch('/api/gdpr/delete', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    setMsg((await res.json()).msg);
  };
  const getConsent = async () => {
    const res = await fetch('/api/gdpr/consent', { headers: { Authorization: `Bearer ${token}` } });
    setConsent((await res.json()).consent);
  };
  const setConsentStatus = async (val: boolean) => {
    const res = await fetch('/api/gdpr/consent', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ consent: val }) });
    setMsg((await res.json()).msg);
    setConsent(val);
  };

  return (
    <Protected>
      <div>
        <h2>DSGVO / GDPR</h2>
        <button onClick={exportData}>Daten exportieren</button>
        <button onClick={deleteAccount} style={{ marginLeft: 8 }}>Account löschen</button>
        <button onClick={getConsent} style={{ marginLeft: 8 }}>Consent Status laden</button>
        <label style={{ marginLeft: 8 }}>
          <input type="checkbox" checked={consent} onChange={e => setConsentStatus(e.target.checked)} /> Consent (Opt-in)
        </label>
        {data && <pre style={{ background: '#eee', marginTop: 16 }}>{JSON.stringify(data, null, 2)}</pre>}
        {msg && <div style={{ color: 'green', marginTop: 8 }}>{msg}</div>}
      </div>
    </Protected>
  );
}
