// sw.js (Workbox)
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new NetworkFirst({cacheName: 'api-cache'})
);
