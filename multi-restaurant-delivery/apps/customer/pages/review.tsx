import React, { useState } from 'react';
import Protected from '../components/Protected';

export default function ReviewPage() {
  const [orderId, setOrderId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Review speichern (später API)
    setMessage('Bewertung gespeichert! (Demo)');
    setOrderId('');
    setRating(5);
    setComment('');
  };

  return (
    <Protected>
      <div>
        <h2>Bestellung bewerten</h2>
        <form onSubmit={handleSubmit}>
          <input value={orderId} onChange={e => setOrderId(e.target.value)} placeholder="Bestell-ID" required />
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Sterne</option>)}
          </select>
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Kommentar" />
          <button type="submit">Absenden</button>
        </form>
        {message && <div style={{color:'green'}}>{message}</div>}
      </div>
    </Protected>
  );
}
