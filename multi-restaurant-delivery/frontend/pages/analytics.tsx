import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchAnalyticsData, fetchLiveAnalytics } from '../services/analyticsService';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AnalyticsPage() {
  const [report, setReport] = useState(null);
  const [live, setLive] = useState(null);
  useEffect(() => {
    fetchAnalyticsData().then(setReport);
    const interval = setInterval(() => fetchLiveAnalytics().then(setLive), 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Analytics & Reporting</h1>
      <Card>
        <h2>Order Trends</h2>
        {report && <Chart type="line" series={report.series} options={report.options} height={300} />}
      </Card>
      <Card>
        <h2>Live Analytics</h2>
        {live && <Chart type="bar" series={live.series} options={live.options} height={200} />}
      </Card>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
}
