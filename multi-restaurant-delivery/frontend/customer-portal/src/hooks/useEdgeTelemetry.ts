import axios from 'axios';

export async function pushEdgeMetric(metric: string, value: number, labels: Record<string, string>) {
  await axios.post('https://pushgateway.delivery.com/metrics', {
    metric,
    value,
    labels,
  });
}

// Beispiel: pushEdgeMetric('edge_inference_latency_seconds', 0.123, { device: 'android', model: 'v1.0.0' });
