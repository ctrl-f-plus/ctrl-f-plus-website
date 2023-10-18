const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  reactStrictMode: false,
  poweredByHeader: false,
  trailingSlash: true,
  headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com', 'asset.cloudinary.com/'],
  },
  async redirects() {
    return [
      {
        source: '/ext',
        destination:
          'https://chrome.google.com/webstore/detail/ctrl-f-plus-ctrl-%2B-f-acro/dkfbnlclahcmcgehpancgfhogmilankf',
        permanent: true,
      },
    ];
  },
};

const ContentSecurityPolicy = `
  default-src 'self'  vercel.live;
  script-src 'self' https://localhost:12719 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com cdn.vercel-insights.com vercel.live https://www.youtube.com https://imgur.com/  static.cloudflareinsights.com;
  frame-src youtube.com www.youtube.com https://imgur.com/;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
    // value: 'SAMEORIGIN'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
    //  value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
