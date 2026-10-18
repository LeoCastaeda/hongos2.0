import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getLegacyRedirects } from './src/lib/legacy-redirects';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return getLegacyRedirects();
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bouletmushrooms.com',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
