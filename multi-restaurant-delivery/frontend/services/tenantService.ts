import axios from 'axios';
export async function fetchTenants() {
  const res = await axios.get('/api/tenant/list');
  return res.data;
}
export async function switchTenant(id: string) {
  await axios.post('/api/tenant/switch', { id });
}
