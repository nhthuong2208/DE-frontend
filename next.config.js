/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  babel: {
    presets: ['next/babel'],
    plugins: [['styled-components', { ssr: true }]],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.BASE_API_URL,
  },
}

module.exports = nextConfig
