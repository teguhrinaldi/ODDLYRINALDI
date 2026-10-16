import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`,
  // which Cloudflare serves as static assets (see wrangler.jsonc).
  output: "export",
  images: {
    // The Next.js image optimizer needs a server, so serve images as-is.
    unoptimized: true,
    // Temporary development-only preview imagery — see the
    // "TEMPORARY PREVIEW IMAGE" comments in src/data/templates.ts.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
