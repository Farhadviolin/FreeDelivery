import { Kafka } from 'kafkajs';
const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER] });
const producer = kafka.producer();
export async function sendNotification(msg) {
  await producer.connect();
  await producer.send({
    topic: 'notifications',
    messages: [{ key: msg.userId, value: JSON.stringify(msg) }],
  });
}
