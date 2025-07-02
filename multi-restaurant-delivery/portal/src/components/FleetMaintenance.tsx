import React, { useEffect, useState } from 'react';

export default function FleetMaintenance({ vehicleId }: { vehicleId: string }) {
  const [data, setData] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  useEffect(() => {
    fetch(`/api/predict/${vehicleId}`).then(r => r.json()).then(setData);
    fetch(`/api/forecast/${vehicleId}?hours=24`).then(r => r.json()).then(setForecast);
  }, [vehicleId]);
  return (
    <div>
      <h2>Maintenance Status für {vehicleId}</h2>
      <div>Anomalien letzte Stunde: {data?.anomalies_last_hour ?? '...'}</div>
      <h3>Temperatur-Prognose (nächste 24h)</h3>
      <ul>
        {forecast.map((f, i) => (
          <li key={i}>{f.ds}: {f.yhat.toFixed(1)}°C</li>
        ))}
      </ul>
    </div>
  );
}
