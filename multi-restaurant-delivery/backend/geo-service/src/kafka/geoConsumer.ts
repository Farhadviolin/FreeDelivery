import { Kafka } from 'kafkajs';
import { GeofenceService } from '../services/GeofenceService';
// import PushService from ...

const kafka = new Kafka({ clientId: 'geo-service', brokers: [process.env.KAFKA_BROKER!] });
const consumer = kafka.consumer({ groupId: 'geo' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'location-events' });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value!.toString());
      const { userId, lat, lng } = event;
      const zones = await GeofenceService.getZonesForLocation(lat, lng);
      if (zones.length) {
        // PushService.notifyZoneEntry(userId, z) ...
        for (const z of zones) {
          // Hier Notification-Logik einfügen
        }
      }
    },
  });
}

run();
