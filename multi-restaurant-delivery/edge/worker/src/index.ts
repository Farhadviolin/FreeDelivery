import { Router } from 'itty-router';

const router = Router();

router.get('/geo-trigger', async request => {
  const { lat, lng, userId } = request.query;
  const zones = await fetch(`https://api.delivery.com/geofence/zones?lat=${lat}&lng=${lng}`);
  if ((await zones.json()).length) {
    await fetch('https://api.delivery.com/events', {
      method: 'POST',
      body: JSON.stringify({ type: 'zone.enter', userId, lat, lng }),
    });
  }
  return new Response('OK');
});

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request));
});
