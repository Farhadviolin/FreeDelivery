// pages/api/analytics/live.js
import '../../services/tracing';
import { trace } from '@opentelemetry/api';

export default async function handler(req, res) {
  const tracer = trace.getTracer('frontend-analytics-api');
  await tracer.startActiveSpan('api-live-handler', async (span) => {
    try {
      // Simulierter Echtzeit-Call
      await new Promise(r => setTimeout(r, 30));
      span.setAttribute('custom.api', 'live');
      res.status(200).json({ live: true, ts: Date.now() });
      span.setStatus({ code: 1 });
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: 2 });
      res.status(500).json({ error: 'fail' });
    } finally {
      span.end();
    }
  });
}
