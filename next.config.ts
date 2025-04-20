import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Needed to be compatible with static exports
  },
};

export default nextConfig;
