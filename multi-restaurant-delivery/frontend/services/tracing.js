// tracing.js
// OpenTelemetry Tracing für Next.js/Frontend-Node-Umgebung (z.B. API-Routes, SSR)
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: process.env.OTEL_EXPORTER_JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()
  .then(() => {
    console.log('Frontend tracing initialized');
  })
  .catch((error) => {
    console.error('Error initializing frontend tracing', error);
  });

// In Next.js: import/require diese Datei in custom server.js oder _app.tsx (SSR) so früh wie möglich.
