import { useEffect, useState } from 'react';

export function Checkout() {
  const [variant, setVariant] = useState(false);
  useEffect(() => {
    setVariant(localStorage.getItem('newCheckout') === 'true');
  }, []);
  return variant
    ? <NewCheckoutFlow />
    : <LegacyCheckoutFlow />;
}
