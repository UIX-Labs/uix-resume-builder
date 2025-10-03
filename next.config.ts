import type { NextConfig } from "next";
const { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_GOOGLE_CLIENT_ID } = process.env;
const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❗ This will ignore type errors during build
    ignoreBuildErrors: true,
  },
  output: 'standalone',
};

export default nextConfig;
