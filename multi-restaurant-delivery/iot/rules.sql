-- Kinesis Rule
SELECT * FROM 'kitchen/telemetry'
  INTO kinesis_stream 'SmartKitchenStream';

-- Timestream Rule (via Lambda)
