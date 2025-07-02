const express = require('express');
const { Queue } = require('bullmq');
const Redis = require('ioredis');
const app = express();
const queue = new Queue('orders', { connection: new Redis('redis://localhost:6379') });

app.use(express.json());

app.post('/enqueue-order', async (req, res) => {
  const { orderId } = req.body;
  const job = await queue.add('process', { orderId });
  res.json({ jobId: job.id, status: 'queued' });
});

app.listen(3001, () => console.log('API listening on 3001'));
