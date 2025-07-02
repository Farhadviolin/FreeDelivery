# Beispiel: Python OpenTelemetry Instrumentierung (FastAPI)
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from fastapi import FastAPI

trace.set_tracer_provider(TracerProvider())
span_processor = BatchSpanProcessor(OTLPSpanExporter(endpoint="http://otel-collector:4317", insecure=True))
trace.get_tracer_provider().add_span_processor(span_processor)

app = FastAPI()
FastAPIInstrumentor.instrument_app(app)

@app.get("/")
def root():
    return {"message": "Tracing enabled!"}
