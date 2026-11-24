import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // `npm run export` builds a fully static copy (used for previews).
  // On Vercel the normal `next build` is used.
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" as const } : {}),
};

export default nextConfig;
