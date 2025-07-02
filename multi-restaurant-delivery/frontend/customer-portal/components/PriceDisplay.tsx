import { useMemo } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export default function PriceDisplay({ amount, currency, locale }: { amount: number; currency: string; locale: string }) {
  const formatted = useMemo(() => formatCurrency(amount, locale, currency), [amount, currency, locale]);
  return <span>{formatted}</span>;
}
