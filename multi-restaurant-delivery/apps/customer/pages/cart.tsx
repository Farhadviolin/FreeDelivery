import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function CartPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/restaurants')
      .then(res => res.json())
      .then(setRestaurants);
  }, []);

  useEffect(() => {
    if (selected) {
      fetch(process.env.NEXT_PUBLIC_API_URL + `/api/menus/${selected}`)
        .then(res => res.json())
        .then(setMenu);
    }
  }, [selected]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const handleOrder = async () => {
    setMessage('');
    const token = localStorage.getItem('token');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: Date.now(),
        restaurant_id: selected,
        customer: 'demo', // Optional: aus Token extrahieren
        items: cart.map(i => i.name),
      }),
    });
    if (res.ok) {
      setCart([]);
      setMessage('Bestellung erfolgreich!');
    } else {
      setMessage('Fehler beim Bestellen');
    }
  };

  return (
    <Protected>
      <div>
        <h2>Warenkorb & Bestellung</h2>
        <select onChange={e => setSelected(Number(e.target.value))} value={selected || ''}>
          <option value="">Restaurant wählen</option>
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <ul>
          {menu.map((item: any) => (
            <li key={item.id}>
              {item.name} – {item.price} €
              <button onClick={() => addToCart(item)}>In den Warenkorb</button>
            </li>
          ))}
        </ul>
        <h3>Warenkorb</h3>
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} – {item.price} €</li>
          ))}
        </ul>
        <button onClick={handleOrder} disabled={!cart.length}>Bestellen</button>
        {message && <div style={{color:'green'}}>{message}</div>}
      </div>
    </Protected>
  );
}
