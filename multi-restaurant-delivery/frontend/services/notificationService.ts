import axios from 'axios';
export async function fetchNotifications() {
  const res = await axios.get('/api/notification/inbox');
  return res.data;
}
export async function markAsRead(id: string) {
  await axios.post(`/api/notification/mark-read`, { id });
}
export async function fetchSettings() {
  const res = await axios.get('/api/notification/settings');
  return res.data;
}
