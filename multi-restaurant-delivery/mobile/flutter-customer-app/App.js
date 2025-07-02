import * as Sentry from '@sentry/react-native';
import './i18n'; // init react-i18next
import { useTranslation } from 'react-i18next';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: 0.05,
  enableNative: true,
  release: process.env.SENTRY_RELEASE,
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

export function setSentryUserContext(userId, meta = {}) {
  Sentry.setUser({ id: userId });
  Sentry.setContext('request-meta', meta);
}

export default function App() {
  const { t, i18n } = useTranslation('common');
  return (
    <View>
      <Text>{t('welcome_message')}</Text>
      <Button onPress={() => i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')}
              title={t('change_language')} />
    </View>
  );
}
