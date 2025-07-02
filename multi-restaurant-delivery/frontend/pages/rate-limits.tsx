import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchRateLimits } from '../services/rateLimitService';

export default function RateLimitsPage() {
  const [limits, setLimits] = useState([]);
  useEffect(() => {
    fetchRateLimits().then(setLimits);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">API Rate Limits</h1>
      <Card>
        <h2>Limits per Tenant/User</h2>
        <ul>
          {limits.map(l => (
            <li key={l.id}>{l.tenant}: {l.limit} req/min</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
