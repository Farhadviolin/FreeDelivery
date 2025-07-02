// Simple script to publish a test notification event to RabbitMQ
const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const QUEUE = 'notifications';

async function publishTestNotification() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });
  const msg = {
    type: 'email',
    to: 'test@example.com',
    subject: 'Test Notification',
    text: 'This is a test.',
  };
  ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), { persistent: true });
  console.log('Test notification sent');
  await ch.close();
  await conn.close();
}

publishTestNotification().catch(console.error);
