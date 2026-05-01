import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers では Next.js の Image Optimization を使わない
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "klueaubrfkcpsxhckirz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
