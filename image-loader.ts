"use client";

import type { ImageLoaderProps } from "next/image";

// Cloudflare Image Transformations (enable on the zone: Images →
// Transformations). In dev the original asset is served untouched.
const isProduction = process.env.NODE_ENV === "production";

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (!isProduction) return src;
  const params = [`width=${width}`, `quality=${quality ?? 75}`, "format=auto"];
  return `/cdn-cgi/image/${params.join(",")}/${src}`;
}
