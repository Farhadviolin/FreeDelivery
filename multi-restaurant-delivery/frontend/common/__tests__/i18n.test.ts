import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

describe('i18n Übersetzungen', () => {
  beforeAll(async () => {
    await i18n
      .use(Backend)
      .init({
        backend: { loadPath: path.join(__dirname, '../../frontend/common/locales/{{lng}}/common.json') },
        fallbackLng: 'en',
        preload: ['en', 'de', 'fr'],
        initImmediate: false
      });
  });

  ['en', 'de', 'fr'].forEach(lng => {
    it(`liefert welcome-String für ${lng}`, () => {
      i18n.changeLanguage(lng);
      const str = i18n.t('welcome', { name: 'Max' });
      expect(str).toMatch(/Max/);
    });
  });
});
