import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Lade...</div>;
  return <>{children}</>;
}
