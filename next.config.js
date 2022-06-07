const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  concurrentFeatures: true,
  images: {
    domains: [],
  },
  i18n,
};
