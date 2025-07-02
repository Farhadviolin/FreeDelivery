import React, { useState } from 'react';

const roles = [
  { value: 'customer', label: 'Kunde' },
  { value: 'driver', label: 'Fahrer' },
  { value: 'restaurant', label: 'Restaurant' },
];

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password, role }),
    });
    if (res.ok) {
      setMessage('Registrierung erfolgreich! Bitte einloggen.');
    } else {
      const data = await res.json();
      setError(data.detail || 'Fehler bei der Registrierung');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrieren</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>
      <button type="submit">Registrieren</button>
      {message && <div style={{color:'green'}}>{message}</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
