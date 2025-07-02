import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Demo: Dummy-Data, später API
    setUsers([
      { username: 'kunde@demo.at', role: 'customer' },
      { username: 'fahrer@demo.at', role: 'driver' },
      { username: 'restaurant@demo.at', role: 'restaurant' },
    ]);
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <Protected>
      <div>
        <h2>Admin-Panel</h2>
        <h3>Benutzer</h3>
        <ul>
          {users.map((u, idx) => (
            <li key={idx}>{u.username} ({u.role})</li>
          ))}
        </ul>
        <h3>Alle Bestellungen</h3>
        <ul>
          {orders.map((o: any) => (
            <li key={o.id}>
              Bestellung {o.id} ({o.items.join(', ')}) – Status: {o.status} – Restaurant: {o.restaurant_id}
            </li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
