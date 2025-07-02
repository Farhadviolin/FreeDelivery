import '../../services/tracing';
import { trace } from '@opentelemetry/api';

export default async function handler(req, res) {
  const tracer = trace.getTracer('frontend-analytics-api');
  await tracer.startActiveSpan('api-custom-event', async (span) => {
    try {
      // Beispiel: Custom-Event für Analytics-Interaktion
      span.setAttribute('custom.event', 'analytics-custom');
      span.addEvent('custom-analytics-event', { user: req.query.user || 'anonymous', ts: Date.now() });
      res.status(200).json({ ok: true, ts: Date.now() });
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
