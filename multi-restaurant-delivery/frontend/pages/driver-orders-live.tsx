import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';

export default function DriverOrdersLiveWS() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let ws: WebSocket | null = null;
    if (typeof window !== 'undefined') {
      ws = new WebSocket('ws://localhost:8000/ws/driver/orders');
      ws.onmessage = (event) => {
        setOrders(JSON.parse(event.data));
      };
    }
    return () => ws && ws.close();
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Live-Aufträge (WebSocket)</h1>
      <Card>
        <ul>
          {orders.map((o: any) => (
            <li key={o.id}>{o.restaurant} → {o.customer} | {o.status}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
