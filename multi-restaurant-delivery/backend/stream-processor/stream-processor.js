import { Kafka } from 'kafkajs';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER] });
const influx = new InfluxDB({ url: process.env.INFLUX_URL, token: process.env.INFLUX_TOKEN });
const writeApi = influx.getWriteApi('org', 'bucket');
const consumer = kafka.consumer({ groupId: 'streamer' });
await consumer.connect();
await consumer.subscribe({ topic: 'events' });
await consumer.run({
  eachMessage: async ({ message }) => {
    const data = JSON.parse(message.value.toString());
    const point = new Point('event_metric').tag('type', data.type).floatField('value', data.value);
    writeApi.writePoint(point);
  },
});
