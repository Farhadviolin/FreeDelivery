import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as de from './locales/de/common.json';
import * as en from './locales/en/common.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'de',
  fallbackLng: 'de',
  resources: {
    de: { common: de },
    en: { common: en },
  },
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
