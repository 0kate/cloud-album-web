const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  basePath: '/album',
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    scope: '/album',
    register: true,
    skipWaiting: true,
  },
})
