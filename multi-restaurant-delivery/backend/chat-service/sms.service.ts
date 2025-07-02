import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_FROM = process.env.TWILIO_FROM;

export async function sendSms(to: string, body: string) {
  await client.messages.create({ to, from: TWILIO_FROM, body });
}
