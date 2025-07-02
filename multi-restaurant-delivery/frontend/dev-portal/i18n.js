const NextI18Next = require('next-i18next').default;
module.exports = new NextI18Next({
  defaultLanguage: 'de',
  otherLanguages: ['en'],
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/locales',
});
