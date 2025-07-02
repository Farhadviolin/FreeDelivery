import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { fetchDriverOrders } from '../services/driverService';

export default function DriverLivePage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => fetchDriverOrders().then(setOrders), 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Live-Aufträge</h1>
      <Card>
        <ul>
          {orders.map(o => (
            <li key={o.id}>{o.restaurant} → {o.customer} | {o.status}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
