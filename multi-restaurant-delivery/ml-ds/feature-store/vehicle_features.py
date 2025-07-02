from datetime import timedelta
from feast import Entity, FeatureView, Field, FileSource
from feast.types import Float32, String

vehicle = Entity(name="vehicle_id", join_keys=["vehicle_id"])

vehicle_telemetry_source = FileSource(
    path="data/vehicle_telemetry.parquet",
    timestamp_field="timestamp",
)

vehicle_telemetry_fv = FeatureView(
    name="vehicle_telemetry",
    entities=["vehicle_id"],
    ttl=timedelta(days=30),
    schema=[
        Field(name="temperature", dtype=Float32),
        Field(name="vibration", dtype=Float32),
        Field(name="status", dtype=String),
    ],
    online=True,
    source=vehicle_telemetry_source,
)
