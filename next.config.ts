import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: [
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'static-ca-cdn.eporner.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'thumbs.externulls.com', // DOMÍNIO DO BEEG
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.xhcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.xhamster.com',
      },
      {
        protocol: 'https',
        hostname: '*.flixcdn.com', // Cobre o ic-nss.flixcdn.com que você mencionou antes
      },
      {
        protocol: 'https',
        hostname: 'ic-vt-nss.xhcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.xhcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.eporner.com',
      },
      {
        protocol: 'https',
        hostname: '*.faphouse.com',
      },
      {
        protocol: 'https',
        hostname: '*.babestube.com',
      },
      {
        protocol: 'https',
        hostname: '*.xgroovy.com',
      },
    ],
  },
};

export default nextConfig;
