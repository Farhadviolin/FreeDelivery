import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export function PayPalCheckout({ amount }: { amount: number }) {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID!, currency: "EUR" }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: amount.toFixed(2) } }],
          })
        }
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          await fetch(`${import.meta.env.VITE_API_URL}/payments/paypal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: details.id }),
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
