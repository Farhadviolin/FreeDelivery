import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function DriverProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/driver/me').catch(() => router.push('/driver-login'));
  }, [router]);
  return <>{children}</>;
}
