import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useLoyalty(userId: string) {
  const { data, error, mutate } = useSWR(
    userId ? `/api/loyalty/balance/${userId}` : null,
    fetcher,
    { refreshInterval: 60000 }
  );
  return {
    points: data?.points,
    status: error ? 'error' : data ? 'success' : 'loading',
    refresh: () => mutate()
  };
}
