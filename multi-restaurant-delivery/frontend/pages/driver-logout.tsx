import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DriverLogoutPage() {
  const router = useRouter();
  useEffect(() => {
    axios.post('/api/driver/logout').finally(() => router.push('/driver-login'));
  }, [router]);
  return <div className="p-8">Logout...</div>;
}
