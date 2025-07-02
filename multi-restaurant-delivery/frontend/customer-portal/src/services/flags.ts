import flagsmith from 'flagsmith';
import useSWR from 'swr';

export function useFlag(key: string) {
  // Simple local flag fetch, replace with real Flagsmith/Optimizely logic
  return flagsmith.hasFeature(key);
}

export function useSegment(userId: string) {
  const { data } = useSWR(`/api/segment/${userId}`, fetcher);
  return data?.segment || 'general';
}
