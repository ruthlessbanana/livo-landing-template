import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectDir = dirname(fileURLToPath(import.meta.url));

/** Static export for Livo/Cloudflare; native Next.js output on Vercel. */
const useStaticExport = !process.env.VERCEL;

const nextConfig: NextConfig = {
  ...(useStaticExport ? { output: "export" as const } : {}),
  transpilePackages: ["@livo/landing-kit"],
  turbopack: {
    // Resolve hoisted workspace deps (tailwind, postcss) from the repo root.
    root: resolve(projectDir, ".."),
  },
};

export default nextConfig;
