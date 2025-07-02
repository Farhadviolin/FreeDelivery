import React, { useState } from 'react';
import Protected from '../components/Protected';

export default function OrderForm() {
  const [restaurantId, setRestaurantId] = useState('1');
  const [items, setItems] = useState('Pizza');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer testtoken', // Demo-Token
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 10000),
        restaurant_id: Number(restaurantId),
        customer: 'test@example.com',
        items: items.split(','),
      }),
    });
    if (res.ok) setMessage('Bestellung erfolgreich!');
    else setMessage('Fehler beim Bestellen');
  };

  return (
    <Protected>
      <form onSubmit={handleSubmit}>
        <h2>Bestellung aufgeben</h2>
        <label>Restaurant ID: <input value={restaurantId} onChange={e => setRestaurantId(e.target.value)} /></label><br />
        <label>Items (Komma-getrennt): <input value={items} onChange={e => setItems(e.target.value)} /></label><br />
        <button type="submit">Bestellen</button>
        <div>{message}</div>
      </form>
    </Protected>
  );
}
