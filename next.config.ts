import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Don't let ESLint block production builds (this site has no lint config).
  eslint: { ignoreDuringBuilds: true },
  // Pin the workspace root to this app so Next never infers it from a parent
  // directory — keeps builds self-contained.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
