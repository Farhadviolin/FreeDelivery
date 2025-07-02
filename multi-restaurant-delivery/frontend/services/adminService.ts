import axios from 'axios';
export async function fetchUsers() {
  const res = await axios.get('/api/admin/users');
  return res.data;
}
export async function fetchRoles() {
  const res = await axios.get('/api/admin/roles');
  return res.data;
}
export async function fetchAuditLogs() {
  const res = await axios.get('/api/admin/audit-logs');
  return res.data;
}
