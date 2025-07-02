import axios from 'axios';
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL!);
async function fetchRates() {
  const res = await axios.get(
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.API_KEY}`,
  );
  const rates = res.data.rates;
  await redis.set('exchange_rates', JSON.stringify(rates), 'EX', 6 * 3600);
  console.log('Rates updated');
}
fetchRates();
