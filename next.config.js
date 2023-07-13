const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // serverComponentsExternalPackages: ['@prisma/client'],
  },
  reactStrictMode: true,
  // swcMinify: true
};
// const nextConfig = {};

module.exports = withContentlayer(nextConfig);
