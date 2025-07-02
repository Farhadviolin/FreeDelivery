import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TwoFAPage() {
  const { t } = useTranslation('common');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [demoCode, setDemoCode] = useState('');

  const request2fa = async () => {
    const res = await fetch('/api/2fa/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'accept-language': navigator.language.slice(0,2) },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    setMsg(data.msg);
    setDemoCode(data.code || '');
  };

  const verify2fa = async () => {
    const res = await fetch('/api/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'accept-language': navigator.language.slice(0,2) },
      body: JSON.stringify({ username, code })
    });
    const data = await res.json();
    setMsg(data.msg || data.detail);
  };

  return (
    <div>
      <h2>2FA (Two-Factor Authentication)</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={request2fa} style={{ marginLeft: 8 }}>{t('request_2fa')}</button>
      {demoCode && <div style={{ marginTop: 8 }}>Demo-Code: <b>{demoCode}</b></div>}
      <div style={{ marginTop: 16 }}>
        <input placeholder="2FA Code" value={code} onChange={e => setCode(e.target.value)} />
        <button onClick={verify2fa} style={{ marginLeft: 8 }}>{t('verify_2fa')}</button>
      </div>
      <div style={{ marginTop: 16 }}>{msg}</div>
    </div>
  );
}
