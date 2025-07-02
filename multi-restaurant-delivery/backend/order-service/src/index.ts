import express from 'express';
import promClient from 'prom-client';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const app = express();
const register = new promClient.Registry();

// Prometheus Counter
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

// Prometheus endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Beispielroute mit Tracing
app.get('/order', (req, res) => {
  const tracer = trace.getTracer('order-service');
  const span = tracer.startSpan('handle_order_request');
  try {
    httpRequestCounter.inc({ method: 'GET', route: '/order', status: 200 });
    // ...Business Logic...
    res.json({ status: 'ok' });
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (e) {
    span.setStatus({ code: SpanStatusCode.ERROR });
    res.status(500).json({ error: 'Internal error' });
  } finally {
    span.end();
  }
});

app.listen(3000, () => {
  console.log(
    'Order Service with Prometheus metrics and OpenTelemetry tracing running on port 3000',
  );
});

// Leerer Export für den Order Service
export {};
