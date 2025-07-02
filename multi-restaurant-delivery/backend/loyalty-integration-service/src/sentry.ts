import * as Sentry from '@sentry/node';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.2,
  release: process.env.SENTRY_RELEASE,
  beforeSend(event) {
    // Sensitive fields maskieren
    if (event.request && event.request.data) {
      for (const key of Object.keys(event.request.data)) {
        if (['password', 'token', 'creditCard', 'secret'].includes(key)) {
          event.request.data[key] = '[MASKED]';
        }
      }
    }
    return event;
  },
});

// User-Context und Request-Metadata Helper
export function setSentryUserContext(userId: string, meta: Record<string, any> = {}) {
  Sentry.setUser({ id: userId });
  Sentry.setContext('request-meta', meta);
}

export default Sentry;
