import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PaymentPage() {
  const { t } = useTranslation('common');
  const [status, setStatus] = useState('');
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch('/api/payment/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'accept-language': navigator.language.slice(0,2) },
      body: JSON.stringify({ order_id: 1, amount: 19.99, method })
    });
    const data = await res.json();
    setStatus(data.message || data.status);
    setUrl(data.payment_url || '');
    setLoading(false);
    if (data.payment_url) window.open(data.payment_url, '_blank');
  };

  return (
    <div>
      <h2>{t('payment')}</h2>
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="stripe">Stripe</option>
        <option value="paypal">PayPal</option>
        <option value="mock">Mock</option>
      </select>
      <button onClick={handlePay} disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? t('processing') : t('pay_now')}
      </button>
      <div style={{ marginTop: 16 }}>{status}</div>
    </div>
  );
}
