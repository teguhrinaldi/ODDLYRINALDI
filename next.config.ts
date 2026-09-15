import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Temporary development-only preview imagery — see the
    // "TEMPORARY PREVIEW IMAGE" comments in src/data/templates.ts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
