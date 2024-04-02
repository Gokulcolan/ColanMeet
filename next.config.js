/** @type {import('next').NextConfig} */


const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,


  env: {
    USER_BASE_URL: process.env.USER_BASE_URL,
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
  },

  experimental: {
    appDir: true,
  },

}

module.exports = nextConfig
