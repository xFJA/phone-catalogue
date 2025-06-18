/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    remotePatterns: [
      (() => {
        const isTest = process.env.NODE_ENV === 'test';
        const apiUrl = isTest ? 'http://dummy' : process.env.PHONE_CATALOGUE_API_URL;
        if (!apiUrl) {
          throw new Error('PHONE_CATALOGUE_API_URL is not set in environment variables');
        }
        const { hostname } = new URL(apiUrl);
        return [
          {
            protocol: 'http',
            hostname,
            port: '',
            pathname: '/images/**',
          },
          {
            protocol: 'https',
            hostname,
            port: '',
            pathname: '/images/**',
          },
        ];
      })(),
    ].flat(),
  },
  // Environment variables are automatically supported by Next.js
  // You can access them via process.env.NEXT_PUBLIC_API_KEY
};

module.exports = nextConfig;
