import { FC } from 'react';
import { useLoyalty } from '../hooks/useLoyalty';

export const LoyaltyBalance: FC<{ userId: string }> = ({ userId }) => {
  const { points, status, refresh } = useLoyalty(userId);

  if (status === 'loading') return <div>Loading points…</div>;
  if (status === 'error') return <div>Error loading points. <button onClick={refresh}>Retry</button></div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Ihr Punktestand</h2>
      <p className="text-3xl">{points} Punkte</p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" onClick={refresh}>
        Aktualisieren
      </button>
    </div>
  );
};
