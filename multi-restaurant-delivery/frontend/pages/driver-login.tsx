import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import axios from 'axios';

export default function DriverLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/driver/login', { username, password });
      router.push('/driver-dashboard');
    } catch (err: any) {
      setError('Login fehlgeschlagen');
    }
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Fahrer-Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input className="border p-2 w-full" placeholder="Benutzername" value={username} onChange={e => setUsername(e.target.value)} />
          <input className="border p-2 w-full" type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}
