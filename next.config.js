/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

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
