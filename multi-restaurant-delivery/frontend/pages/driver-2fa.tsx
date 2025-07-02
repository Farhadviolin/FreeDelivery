import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import axios from 'axios';

export default function Driver2FAPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handle2FA(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/driver/2fa', { code });
      router.push('/driver-dashboard');
    } catch (err: any) {
      setError('2FA fehlgeschlagen');
    }
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <Card>
        <h1 className="text-2xl font-bold mb-4">2FA für Fahrer</h1>
        <form onSubmit={handle2FA} className="space-y-4">
          <input className="border p-2 w-full" placeholder="2FA Code" value={code} onChange={e => setCode(e.target.value)} />
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit">Bestätigen</Button>
        </form>
      </Card>
    </div>
  );
}
