import { proxyActivities, defineSignal, setHandler } from '@temporalio/workflow';
import type * as activities from '../activities';

const { sendNotification, waitForResponse } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function notificationWorkflow(userId: string, campaignId: string) {
  // Step 1: In-App
  await sendNotification(userId, campaignId, 'in-app');
  const opened = await waitForResponse(userId, campaignId, { timeout: 3600_000 });
  if (!opened) {
    // Step 2: SMS
    await sendNotification(userId, campaignId, 'sms');
    // Follow-up after 24h
    await new Promise(res => setTimeout(res, 24 * 3600_000));
    await sendNotification(userId, campaignId, 'email');
  }
}
