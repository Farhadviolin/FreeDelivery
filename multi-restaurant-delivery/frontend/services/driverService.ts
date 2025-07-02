import axios from 'axios';
export async function fetchDriverOrders() {
  const res = await axios.get('/api/driver/orders');
  return res.data;
}
export async function acceptOrder(id: string) {
  await axios.post('/api/driver/accept', { id });
}
export async function completeOrder(id: string) {
  await axios.post('/api/driver/complete', { id });
}
export async function fetchDriverStats() {
  const res = await axios.get('/api/driver/stats');
  return res.data;
}
