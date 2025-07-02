import { init, setUser, setContext } from '@sentry/nextjs';
init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  beforeSend(event) {
    if (event.request && event.request.data) {
      for (const key of Object.keys(event.request.data)) {
        if (["password", "token", "creditCard", "secret"].includes(key)) {
          event.request.data[key] = "[MASKED]";
        }
      }
    }
    return event;
  },
});

export function setSentryUserContext(userId: string, meta: Record<string, any> = {}) {
  setUser({ id: userId });
  setContext('request-meta', meta);
}
