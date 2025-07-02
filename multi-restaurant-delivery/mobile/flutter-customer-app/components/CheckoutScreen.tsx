import { useFlag } from '../services/flagsNative';
export function CheckoutScreen() {
  const isNew = useFlag('new_checkout_flow');
  return isNew ? <NewCheckout /> : <LegacyCheckout />;
}
