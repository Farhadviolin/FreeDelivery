const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/enqueue-order';
const orderId = 123;

fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderId })
})
  .then(res => res.json())
  .then(console.log);
