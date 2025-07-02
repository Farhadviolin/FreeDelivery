import useSWR from 'swr';
import { Chart } from 'react-chartjs-2';

const fetcher = (url:string) => fetch(url).then(res=>res.json());

export default function Executive() {
  const { data } = useSWR('/api/kpis', fetcher);
  if (!data) return <div>Loading...</div>;
  const labels = data.map((d:any)=>d.period);
  const revenue = data.map((d:any)=>d.total_revenue);
  return (
    <div>
      <h1>Executive Dashboard</h1>
      <Chart type="line" data={{ labels, datasets:[{ label:'Revenue', data: revenue }] }} />
      <a href="/reports/executive_report.pdf" target="_blank">Download Monthly Report</a>
    </div>
  );
}
