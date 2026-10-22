import type { NextConfig } from 'next';
import path from 'path';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
];

const noIndexHeaders = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];

const nextConfig: NextConfig = {
  transpilePackages: ['@mge/config', '@mge/types', '@mge/utils'],
  devIndicators: false,
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // All site imagery is served from /public. Remote images are not allowed,
    // which also stops the image optimiser being used as an open proxy.
    remotePatterns: [],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/portal/:path*', headers: noIndexHeaders },
      { source: '/login/:path*', headers: noIndexHeaders },
      { source: '/api/:path*', headers: noIndexHeaders },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/brand/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
  // Ensure Tailwind/PostCSS resolve from the web app directory in monorepo
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
