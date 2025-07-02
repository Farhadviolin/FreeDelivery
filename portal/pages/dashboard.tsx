import useSWR from 'swr';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const [region, setRegion] = useState('all');
  const [restaurant, setRestaurant] = useState('all');
  const [period, setPeriod] = useState('30d');
  const query = {
    measures: ['KPIs.totalOrders','KPIs.totalRevenue'],
    timeDimensions: [{ dimension: 'KPIs.day', granularity: 'day', dateRange: period }],
    filters: [
      ...(region !== 'all' ? [{ dimension: 'KPIs.region', operator: 'equals', values: [region] }] : []),
      ...(restaurant !== 'all' ? [{ dimension: 'KPIs.restaurant', operator: 'equals', values: [restaurant] }] : [])
    ]
  };
  const { data } = useSWR('/api/cubejs-api/v1/load?query=' + encodeURIComponent(JSON.stringify(query)), fetcher);
  const chartData = data?.data || [];
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Executive Dashboard</h1>
      <div className="mb-4 flex gap-4">
        <select value={region} onChange={e=>setRegion(e.target.value)}>
          <option value="all">Alle Regionen</option>
          <option value="north">Nord</option>
          <option value="south">Süd</option>
        </select>
        <select value={restaurant} onChange={e=>setRestaurant(e.target.value)}>
          <option value="all">Alle Restaurants</option>
          <option value="r1">R1</option>
          <option value="r2">R2</option>
        </select>
        <select value={period} onChange={e=>setPeriod(e.target.value)}>
          <option value="7d">7 Tage</option>
          <option value="30d">30 Tage</option>
          <option value="90d">90 Tage</option>
        </select>
      </div>
      <LineChart width={800} height={400} data={chartData}>
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="KPIs.totalOrders" stroke="#8884d8" />
        <Line type="monotone" dataKey="KPIs.totalRevenue" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
