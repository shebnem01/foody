
const { i18n } = require('./next-i18next.config.js');

module.exports = {
    i18n,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "*",
          },
        ],
      },
};