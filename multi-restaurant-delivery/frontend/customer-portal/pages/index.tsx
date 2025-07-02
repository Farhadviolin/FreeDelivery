import Link from 'next/link';
import { Layout } from '@ui/Layout';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Customer Portal</h1>
      <nav className="space-x-4">
        <Link href="/feed">Feed</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/consent">Consent</Link>
        <Link href="/dsar">DSAR</Link>
      </nav>
    </Layout>
  );
}
