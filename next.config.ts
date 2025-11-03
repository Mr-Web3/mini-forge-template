import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  transpilePackages: ["@coinbase/onchainkit"],
  images: {
    remotePatterns: [
      // Farcaster/Neynar common image sources
      {
        protocol: "https",
        hostname: "imagedelivery.net", // Cloudflare Images (common for Farcaster profile pics)
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // AWS S3
      },
      {
        protocol: "https",
        hostname: "*.mypinata.cloud", // Pinata
      },
      // Allow all other HTTPS domains for maximum compatibility
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
