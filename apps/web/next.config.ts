import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  transpilePackages: ['@mge/config', '@mge/types', '@mge/utils'],
  devIndicators: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Ensure Tailwind/PostCSS resolve from the web app directory in monorepo
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default nextConfig;
