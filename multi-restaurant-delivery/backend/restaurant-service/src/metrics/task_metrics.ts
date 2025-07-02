import { Counter, Histogram, register } from 'prom-client';
import { Queue } from 'bullmq';

export function setupTaskMetrics(queue: Queue) {
  const processed = new Counter({ name: 'tasks_processed_total', help: 'Total processed tasks' });
  const latency = new Histogram({
    name: 'task_latency_seconds',
    help: 'Task processing latency in seconds',
  });

  queue.on('completed', (job) => {
    processed.inc();
    latency.observe((Date.now() - job.timestamp) / 1000);
  });
}
