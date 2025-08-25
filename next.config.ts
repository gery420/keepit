import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/server/:path*",
        destination: "http://localhost:5000/server/:path*"
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:5000/auth/:path*"
      },
      {
        source: "/user/:path*",
        destination: "http://localhost:5000/user/:path*"
      }
      
    ];
  }
};

export default nextConfig;
