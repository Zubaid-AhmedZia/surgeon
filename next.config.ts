// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "images.unsplash.com" },
//       { protocol: "https", hostname: "plus.unsplash.com" },
//       { protocol: "https", hostname: "images.pexels.com" },
//       { protocol: "https", hostname: "cdn.sanity.io" },
//     ],
//     // Avoid server-side optimization fetches in dev/offline
//     unoptimized: true,
//   },
//   // Pin Turbopack root to this project to avoid mis-detected workspace roots on Windows
//   // This resolves ENOENT for temporary manifest files under .next/static/development
//   turbopack: {
//     root: process.cwd(),
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    // keep this if you prefer no Next/Image optimization; otherwise remove for Vercel's optimizer
    unoptimized: true,
  },

  // Avoid Turbopack workspace root confusion on Windows
  turbopack: { root: process.cwd() },

  // Add custom headers (works on Vercel & self-host)
  async headers() {
    return [
      // Long-cache all model assets under /public/models
      {
        source: "/models/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Ensure correct MIME for GLB / GLTF (paranoid correctness)
      {
        source: "/models/:path*.glb",
        headers: [{ key: "Content-Type", value: "model/gltf-binary" }],
      },
      {
        source: "/models/:path*.gltf",
        headers: [{ key: "Content-Type", value: "model/gltf+json" }],
      },
      // Site-wide safety headers
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
