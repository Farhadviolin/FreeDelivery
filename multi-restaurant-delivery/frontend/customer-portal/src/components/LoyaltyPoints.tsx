import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function LoyaltyPoints({ userId }: { userId: string }) {
  const [balance, setBalance] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`/api/loyalty/balance/${userId}`).then(r => setBalance(r.data.balance));
    axios.get('/api/loyalty/leaderboard').then(r => setLeaderboard(r.data));
  }, [userId]);

  return (
    <div>
      <h2>Deine Treuepunkte: {balance}</h2>
      <h3>Leaderboard</h3>
      <ol>
        {leaderboard.map((u, i) => (
          <li key={u.userId}>{u.userId}: {u.total}</li>
        ))}
      </ol>
    </div>
  );
}
