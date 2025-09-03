import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // Avoid server-side optimization fetches in dev/offline
    unoptimized: true,
  },
  // Pin Turbopack root to this project to avoid mis-detected workspace roots on Windows
  // This resolves ENOENT for temporary manifest files under .next/static/development
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
