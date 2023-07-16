const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: true,
};
// const nextConfig = {};

module.exports = withContentlayer(nextConfig);
