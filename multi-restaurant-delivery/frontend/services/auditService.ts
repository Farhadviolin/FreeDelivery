import axios from 'axios';
export async function fetchAuditExport(format: 'csv' | 'json') {
  const res = await axios.get(`/api/audit/export/${format}`);
  return res.data;
}
