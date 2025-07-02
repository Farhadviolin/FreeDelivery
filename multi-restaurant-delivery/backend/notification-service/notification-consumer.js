import { Kafka } from 'kafkajs';
import sendgrid from '@sendgrid/mail';
import admin from 'firebase-admin';
import twilio from 'twilio';
import Redis from 'ioredis';
import { rateLimiter } from './rateLimiter.js';

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER] });
const consumer = kafka.consumer({ groupId: 'notification-group' });
const redis = new Redis(process.env.REDIS_URL);
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
admin.initializeApp({ credential: admin.credential.applicationDefault() });

async function handleNotification(msg) {
  const { channel, to, subject, body, pushToken, smsNumber } = msg;
  if (!(await rateLimiter(redis, to))) return;
  if (channel === 'email') {
    await sendgrid.send({ to, from: 'noreply@service', subject, text: body });
  } else if (channel === 'push') {
    await admin.messaging().send({ token: pushToken, notification: { title: subject, body } });
  } else if (channel === 'sms') {
    await twilioClient.messages.create({ to: smsNumber, from: process.env.TWILIO_FROM, body });
  }
}

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notifications' });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const msg = JSON.parse(message.value.toString());
      await handleNotification(msg);
    },
  });
}
