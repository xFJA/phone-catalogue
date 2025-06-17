/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Environment variables are automatically supported by Next.js
  // You can access them via process.env.NEXT_PUBLIC_API_KEY
};

module.exports = nextConfig;
