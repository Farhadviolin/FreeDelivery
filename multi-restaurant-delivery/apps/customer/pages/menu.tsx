import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function MenuPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [menu, setMenu] = useState<any[]>([]);

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

  return (
    <Protected>
      <div>
        <h2>Speisekarte</h2>
        <select onChange={e => setSelected(Number(e.target.value))} value={selected || ''}>
          <option value="">Restaurant wählen</option>
          {restaurants.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <ul>
          {menu.map((item: any) => (
            <li key={item.id}>{item.name} – {item.price} €</li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
