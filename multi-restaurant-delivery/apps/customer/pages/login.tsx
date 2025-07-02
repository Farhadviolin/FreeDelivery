import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('kunde@demo.at');
  const [password, setPassword] = useState('test123');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      window.location.href = '/restaurants';
    } else {
      setError('Login fehlgeschlagen');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" />
      <button type="submit">Login</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
