import dynamic from 'next/dynamic';
import { Card } from '../../packages/ui/src/Card';
const Map = dynamic(() => import('../components/DriverMap'), { ssr: false });

export default function DriverMapPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Karte & Navigation</h1>
      <Card>
        <Map />
      </Card>
    </div>
  );
}
