import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const exporter = new PrometheusExporter({ startServer: true }, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});
const meterProvider = new MeterProvider({ exporter });
registerInstrumentations({
  meterProvider,
  instrumentations: [
    // TODO: HTTP, Redis, TypeORM, BullMQ Instrumentation
  ],
});

export const metrics = meterProvider.getMeter('loyalty-service');
