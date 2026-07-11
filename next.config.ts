import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root: a stray lockfile in the user home directory
    // otherwise makes Next.js infer the wrong root.
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
