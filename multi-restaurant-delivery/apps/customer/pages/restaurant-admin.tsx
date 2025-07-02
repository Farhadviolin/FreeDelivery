import { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function RestaurantAdmin() {
  const [menu, setMenu] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const restaurantId = 1; // Demo: Restaurant-ID 1

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `/api/menus/${restaurantId}`)
      .then(res => res.json())
      .then(setMenu);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/menus/${restaurantId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: Date.now(),
        name,
        price: parseFloat(price),
      }),
    });
    if (res.ok) {
      setMenu([...menu, { id: Date.now(), name, price: parseFloat(price) }]);
      setName('');
      setPrice('');
      setMessage('Gericht hinzugefügt!');
    } else {
      setMessage('Fehler beim Hinzufügen');
    }
  };

  return (
    <Protected>
      <div>
        <h2>Restaurant-Admin: Menüverwaltung</h2>
        <form onSubmit={handleAdd}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Gericht" required />
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Preis" type="number" required />
          <button type="submit">Hinzufügen</button>
        </form>
        {message && <div style={{color:'green'}}>{message}</div>}
        <ul>
          {menu.map((item: any) => (
            <li key={item.id}>{item.name} – {item.price} €</li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
