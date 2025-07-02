import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchDriverOrders, acceptOrder, completeOrder } from '../services/driverService';

export default function DriverOrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchDriverOrders().then(setOrders);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Fahrer-Aufträge</h1>
      <Card>
        <h2>Aktive Aufträge</h2>
        <ul>
          {orders.filter(o => o.status === 'active').map(o => (
            <li key={o.id}>
              {o.restaurant} → {o.customer} | {o.status}
              <Button onClick={() => completeOrder(o.id)}>Abschließen</Button>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2>Neue Aufträge</h2>
        <ul>
          {orders.filter(o => o.status === 'new').map(o => (
            <li key={o.id}>
              {o.restaurant} → {o.customer}
              <Button onClick={() => acceptOrder(o.id)}>Übernehmen</Button>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2>Abgeschlossene Aufträge</h2>
        <ul>
          {orders.filter(o => o.status === 'completed').map(o => (
            <li key={o.id}>{o.restaurant} → {o.customer} | {o.status}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
