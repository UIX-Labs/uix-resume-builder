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
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uix-resume-builder.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
