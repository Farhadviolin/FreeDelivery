import amqp from 'amqplib';

export async function initRabbit() {
  const conn = await amqp.connect(process.env.RABBIT_URL!);
  const channel = await conn.createChannel();
  await channel.assertExchange('orders_exchange', 'topic', { durable: true });
  return channel;
}

export function RabbitSubscriber(
  channel: amqp.Channel,
  exchange: string,
  keys: string[],
  onMessage: (msg: any, routingKey: string) => void,
) {
  channel.assertQueue('', { exclusive: true }).then((q) => {
    keys.forEach((key) => channel.bindQueue(q.queue, exchange, key));
    channel.consume(q.queue, (msg) => {
      if (!msg) return;
      const content = JSON.parse(msg.content.toString());
      onMessage(content, msg.fields.routingKey);
      channel.ack(msg);
    });
  });
}
