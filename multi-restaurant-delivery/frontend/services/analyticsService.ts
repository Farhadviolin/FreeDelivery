import './tracing';
import axios from 'axios';
import { trace, context } from '@opentelemetry/api';

const tracer = trace.getTracer('frontend-analytics-service');

export async function fetchAnalyticsData() {
  return tracer.startActiveSpan('fetchAnalyticsData', async (span) => {
    try {
      const res = await axios.get('/api/analytics/report');
      span.setAttribute('http.status_code', res.status);
      span.setStatus({ code: res.status === 200 ? 1 : 2 });
      return res.data;
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: 2 });
      throw err;
    } finally {
      span.end();
    }
  });
}

export async function fetchLiveAnalytics() {
  return tracer.startActiveSpan('fetchLiveAnalytics', async (span) => {
    try {
      const res = await axios.get('/api/analytics/live');
      span.setAttribute('http.status_code', res.status);
      span.setStatus({ code: res.status === 200 ? 1 : 2 });
      return res.data;
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: 2 });
      throw err;
    } finally {
      span.end();
    }
  });
}
