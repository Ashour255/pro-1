/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'altamyouzkw.com',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
