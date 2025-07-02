const { Queue, Worker, QueueScheduler } = require('bullmq');
const Redis = require('ioredis');
const connection = new Redis('redis://localhost:6379');

const queue = new Queue('orders', { connection });
const scheduler = new QueueScheduler('orders', { connection });

const worker = new Worker('orders', async job => {
  // Job-Logik
  if (job.data.fail) throw new Error('Fail!');
  return { result: job.data.orderId * 2 };
}, { connection });

queue.add('process', { orderId: 123 });

worker.on('completed', job => console.log('Done:', job.id));
worker.on('failed', job => console.log('Failed:', job.id));
