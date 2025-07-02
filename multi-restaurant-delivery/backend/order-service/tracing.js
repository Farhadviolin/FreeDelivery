// tracing.js
// OpenTelemetry Node.js Tracing Boilerplate for Multi-Restaurant-Delivery Platform

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: process.env.OTEL_EXPORTER_JAEGER_ENDPOINT || 'http://localhost:14268/api/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk
  .start()
  .then(() => {
    console.log('Tracing initialized');
  })
  .catch((error) => {
    console.error('Error initializing tracing', error);
  });

// To use: require('./tracing') as early as possible in your service entrypoint.
