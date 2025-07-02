import axios from 'axios';
export async function sendNotification(userId: string, campaignId: string, channel: string) {
  await axios.post(`${process.env.NOTIF_API}/notify`, { userId, campaignId, channel });
}
