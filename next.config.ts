import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Inline the (small) stylesheet so it doesn't block the first paint on mobile data.
  experimental: { inlineCss: true },
};

export default nextConfig;
