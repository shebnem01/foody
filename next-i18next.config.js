const path = require("path");

module.exports = {
  i18n: {
    locales: ['en', 'tr', 'az'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales')
  },
};