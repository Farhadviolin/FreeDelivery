import { motion } from 'framer-motion';
import useSWR from 'swr';
import { useFlag } from '../services/flags';
import { Card } from './Card';

export function AdaptiveCard({ itemId }: { itemId: string }) {
  const isVariant = useFlag('adaptive_layout');
  const { data } = useSWR(`/api/item/${itemId}`, fetcher);
  if (!data) return null;
  return isVariant ? (
    <motion.div layout transition={{ duration: 0.3 }} className="grid grid-cols-2 gap-4">
      {data.recommendations.map((r: any) => <Card key={r.id} {...r} />)}
    </motion.div>
  ) : (
    <div className="space-y-4">{data.recommendations.map((r: any) => <Card key={r.id} {...r} />)}</div>
  );
}
