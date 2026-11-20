import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The Kiiex case study was retired for Curio; old links land on the index.
  async redirects() {
    return [{ source: '/work/kiiex', destination: '/', permanent: false }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',
  },
};

export default nextConfig;
