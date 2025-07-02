import Link from 'next/link';
import { Layout } from '@ui/Layout';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Driver App</h1>
      <nav className="space-x-4">
        <Link href="/orders">Orders</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </Layout>
  );
}
