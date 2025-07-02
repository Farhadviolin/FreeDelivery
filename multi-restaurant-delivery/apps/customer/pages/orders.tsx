import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      headers: { Authorization: 'Bearer testtoken' },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <Protected>
      <div>
        <h1>Deine Bestellungen</h1>
        <ul>
          {orders.map((o: any) => (
            <li key={o.id}>
              Bestellung {o.id} bei Restaurant {o.restaurant_id}: {o.items.join(', ')} (Status: {o.status})
            </li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
