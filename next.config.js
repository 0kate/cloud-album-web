const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '/album',
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
}
