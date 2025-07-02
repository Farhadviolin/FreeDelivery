import axios from 'axios';
export async function fetchRateLimits() {
  const res = await axios.get('/api/rate-limits');
  return res.data;
}
