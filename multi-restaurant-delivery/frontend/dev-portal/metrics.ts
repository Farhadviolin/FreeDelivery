import { Counter } from 'prom-client';
export const apiCallCounter = new Counter({
  name: 'devportal_api_calls_total',
  help: 'API-Aufrufe des Developer Portals',
  labelNames: ['endpoint']
});
