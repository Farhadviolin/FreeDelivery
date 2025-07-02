// loadtests/analyze-summary.js
const fs = require('fs');
const summary = JSON.parse(fs.readFileSync('summary.json', 'utf-8'));

const p95 = summary.metrics.http_req_duration && summary.metrics.http_req_duration['p(95)'];
const errorRate = summary.metrics.http_req_failed && summary.metrics.http_req_failed.rate;
const throughput = summary.metrics.http_reqs && summary.metrics.http_reqs.count / summary.state.testRunDuration;

const report = `# k6 Loadtest Report\n\n- **p95 Latenz:** ${p95} ms\n- **Fehlerquote:** ${(errorRate * 100).toFixed(2)} %\n- **Durchsatz:** ${throughput.toFixed(2)} RPS\n`;

fs.writeFileSync('k6-report.md', report);
console.log(report);
