# Distributed Tracing & APM (OpenTelemetry, Jaeger, Tempo, Grafana)

## Node.js Backend
1. Install dependencies:
   ```sh
   npm install @opentelemetry/sdk-node @opentelemetry/exporter-jaeger @opentelemetry/auto-instrumentations-node --legacy-peer-deps
   ```
2. Füge `require('./tracing')` am Anfang deines Service-Entrypoints hinzu.
3. Passe ggf. die Jaeger-Endpoint-URL in `tracing.js` an.

## Python Backend
1. Installiere:
   ```sh
   pip install opentelemetry-sdk opentelemetry-exporter-otlp opentelemetry-instrumentation
   ```
2. Beispiel (app.py):
   ```python
   from opentelemetry import trace
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import BatchSpanProcessor
   from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
   from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

   trace.set_tracer_provider(TracerProvider())
   span_processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="http://otel-collector:4317", insecure=True))
   trace.get_tracer_provider().add_span_processor(span_processor)
   # Instrumentiere FastAPI
   # FastAPIInstrumentor.instrument_app(app)
   ```

## Java Backend
1. Siehe https://opentelemetry.io/docs/instrumentation/java/auto/
2. Beispiel:
   ```sh
   java -javaagent:opentelemetry-javaagent.jar -Dotel.exporter.otlp.endpoint=http://otel-collector:4317 -jar yourapp.jar
   ```

## OpenTelemetry Collector & Helm
- Collector-Config: `devops/opentelemetry/otel-collector-config.yaml`
- Helm-Values: `helm/opentelemetry/values.yaml`

## Jaeger/Tempo/Grafana
- Jaeger UI: http://<jaeger-host>:16686
- Tempo/Grafana: siehe Grafana Data Source

## Validierung
- Traces sollten nach Deployment in Jaeger/Grafana sichtbar sein.
