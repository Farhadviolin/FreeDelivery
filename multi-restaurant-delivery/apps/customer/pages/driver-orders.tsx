import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function DriverOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const handlePickup = (id: number) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'on_the_way' } : o));
    setMessage('Bestellung abgeholt! (Demo)');
  };

  const handleDeliver = (id: number) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    setMessage('Bestellung ausgeliefert! (Demo)');
  };

  return (
    <Protected>
      <div>
        <h2>Fahrer: Aufträge</h2>
        {message && <div style={{color:'green'}}>{message}</div>}
        <ul>
          {orders.map((o: any) => (
            <li key={o.id}>
              Bestellung {o.id} ({o.items.join(', ')}) – Status: {o.status}
              {o.status === 'pending' && <button onClick={() => handlePickup(o.id)}>Abholen</button>}
              {o.status === 'on_the_way' && <button onClick={() => handleDeliver(o.id)}>Ausliefern</button>}
            </li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
