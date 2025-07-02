import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
I18nModule.forRoot({
  fallbackLanguage: 'en',
  loaderOptions: { path: '/i18n/', watch: true },
  resolvers: [AcceptLanguageResolver],
});
