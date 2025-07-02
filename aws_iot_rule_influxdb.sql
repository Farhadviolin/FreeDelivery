SELECT topic(2) as deviceId, temperature, humidity, timestamp()
  FROM 'kitchen/+/sensor'
  INTO
    'aws.connectors.destination' /* configured to InfluxDB connector */
