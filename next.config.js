const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
}
