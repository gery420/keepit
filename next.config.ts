import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: "https://keepit-back.vercel.app/server/:path*"
      },
      {
        source: "/auth/:path*",
        destination: "https://keepit-back.vercel.app/auth/:path*"
      },
      {
        source: "/user/:path*",
        destination: "https://keepit-back.vercel.app/user/:path*"
      }
      
    ];
  }
};

export default nextConfig;
