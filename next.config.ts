import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the parent directory otherwise makes Turbopack infer
  // the wrong workspace root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // The section was renamed from "programs" to "projects"; keep old links alive.
  async redirects() {
    return [
      { source: "/programs", destination: "/projects", permanent: true },
      { source: "/programs/:slug", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
