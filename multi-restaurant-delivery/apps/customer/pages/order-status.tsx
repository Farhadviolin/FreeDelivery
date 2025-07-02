import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function CustomerOrderStatus() {
  const [orders, setOrders] = useState<any[]>([]);
  const [liveStatus, setLiveStatus] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/status');
    ws.onmessage = (event) => setLiveStatus(event.data);
    return () => ws.close();
  }, []);

  return (
    <Protected>
      <div>
        <h2>Bestellstatus</h2>
        <div style={{color: 'green', marginBottom: 8}}>{liveStatus && `Live: ${liveStatus}`}</div>
        <ul>
          {orders.map((o: any) => (
            <li key={o.id}>
              Bestellung {o.id}: {o.items.join(', ')} – Status: <b>{o.status}</b>
            </li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
