import React, { useEffect, useState } from 'react';
import Protected from '../components/Protected';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/restaurants')
      .then((res) => res.json())
      .then(setRestaurants);
  }, []);

  return (
    <Protected>
      <div>
        <h1>Restaurants</h1>
        <ul>
          {restaurants.map((r: any) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </div>
    </Protected>
  );
}
