module.exports = {
  input: ['app/**/*.{js,jsx,ts,tsx}', 'mobile-app/**/*.{js,ts}', 'server/**/*.{js,ts}'],
  output: './locales/$LOCALE/$NAMESPACE.json',
  options: {
    debug: false,
    removeUnusedKeys: true,
    sort: true,
    func: { list: ['t', 'i18n.t'] },
    lngs: ['de', 'en', 'fr', 'es'],
    ns: ['common', 'errors', 'checkout'],
    defaultLng: 'de',
    defaultNs: 'common'
  }
};
