import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import { env } from "./env";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: !process.env.CI,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return await [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ];
  },
};

export default () => {
  const plugins = [withBundleAnalyzer({ enabled: env.ANALYZE })];

  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });

  return config;
};
