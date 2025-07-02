import Link from 'next/link';
import { Card } from '../../packages/ui/src/Card';
import DriverNotificationListener from '../components/DriverNotificationListener';

export default function DriverDashboard() {
  return (
    <div className="p-8 space-y-8">
      <DriverNotificationListener />
      <h1 className="text-2xl font-bold">Fahrer-Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card><Link href="/driver-orders">Aufträge</Link></Card>
        <Card><Link href="/driver-analytics">Analytics</Link></Card>
        <Card><Link href="/driver-profile">Profil</Link></Card>
        <Card><Link href="/driver-settings">Einstellungen</Link></Card>
      </div>
    </div>
  );
}
