import useSWR from 'swr';
export default function Campaigns() {
  const { data } = useSWR('/api/campaigns');
  return (
    <div>
      <h1>Campaigns</h1>
      {data?.map(c => (
        <div key={c.id}>
          <h2>{c.name}</h2>
          <p>Scans: {c.scanCount}</p>
          <img src={c.qrImage} alt="QR Code" />
        </div>
      ))}
    </div>
  );
}
