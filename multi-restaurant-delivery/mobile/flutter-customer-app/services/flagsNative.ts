import flagsmith from 'flagsmith/react-native';
import { useState, useEffect } from 'react';

export async function initFlags() {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ENV_ID,
    cacheFlags: true,
  });
}
export function useFlag(key) {
  const [value, setValue] = useState(flagsmith.hasFeature(key));
  useEffect(() => {
    flagsmith.on('change', () => setValue(flagsmith.hasFeature(key)));
  }, []);
  return value;
}
