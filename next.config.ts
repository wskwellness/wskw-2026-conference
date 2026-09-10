import type { NextConfig } from "next";
import path from "node:path";
import { PROGRAM_URL } from "./program";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Don't let ESLint block production builds (this site has no lint config).
  eslint: { ignoreDuringBuilds: true },
  // Pin the workspace root to this app so Next never infers it from a parent
  // directory — keeps builds self-contained.
  outputFileTracingRoot: path.join(__dirname),
  // Stable, printable URL for the program (safe on signage and QR codes).
  // Deliberately a temporary (307) redirect, not permanent: a 308 would be
  // cached by browsers indefinitely, so a future change of Drive link would
  // never reach anyone who had already followed the old one.
  async redirects() {
    return [{ source: "/program", destination: PROGRAM_URL, permanent: false }];
  },
};

export default nextConfig;
