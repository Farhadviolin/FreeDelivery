import { useEffect, useState } from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';

const client = initialize('LD_CLIENT_SIDE_ID', { key: 'user-123' });

export function useVariant(flagKey: string) {
  const [variant, setVariant] = useState<string | null>(null);
  useEffect(() => {
    client.on('ready', () => {
      setVariant(client.variation(flagKey, 'control'));
    });
  }, []);
  return variant;
}
