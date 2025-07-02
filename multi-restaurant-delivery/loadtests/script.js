import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '3m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    'http_req_duration{scenario:default}': ['p(50)<200', 'p(90)<400', 'p(99)<800'],
    'http_req_failed': ['rate<0.01'],
    'checks': ['rate>0.98'],
    'http_reqs': ['count>1000'],
  },
};

export default function () {
  let res1 = http.post(`${__ENV.E2EE_URL}/encrypt`, JSON.stringify({
    keyId: 'test', plaintext: 'performance test'
  }), { headers: { 'Content-Type':'application/json' } });
  check(res1, { 'encrypt OK': r => r.status === 200 });

  let res2 = http.get(`${__ENV.ORDER_URL}/health`);
  check(res2, { 'order healthy': r => r.status === 200 });

  let res3 = http.get(`${__ENV.LOYALTY_URL}/balance/u1`);
  check(res3, { 'loyalty OK': r => r.status === 200 });

  let res4 = http.post(`${__ENV.SYNC_URL}/syncOrders`);
  check(res4, { 'sync OK': r => r.status === 200 });

  // Loyalty-Redemption-Flow
  let redeem = http.post(`${__ENV.LOYALTY_URL}/rewards/redeem`, JSON.stringify({
    userId: 'u1', rewardId: 'r1', idempotencyKey: `${__VU}-${__ITER}`
  }), { headers: { 'Content-Type':'application/json' } });
  check(redeem, { 'redeem OK': r => r.status === 200 });

  // Offline-Sync Edge-Case
  let offline = http.post(`${__ENV.SYNC_URL}/syncOrders`, JSON.stringify({ orders: [] }), { headers: { 'Content-Type':'application/json' } });
  check(offline, { 'sync empty OK': r => r.status === 200 });

  sleep(1);
}
