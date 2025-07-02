import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { fetchDriverStats } from '../services/driverService';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DriverAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetchDriverStats().then(setStats);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Fahrer-Analytics</h1>
      <Card>
        {stats ? (
          <>
            <ul className="mb-4">
              <li>Fahrten: {stats.rides}</li>
              <li>Umsatz: {stats.earnings} €</li>
              <li>Bewertungen: {stats.rating} / 5</li>
            </ul>
            <Chart type="bar" series={stats.series} options={stats.options} height={200} />
          </>
        ) : (
          'Lade Analytics...'
        )}
      </Card>
    </div>
  );
}
