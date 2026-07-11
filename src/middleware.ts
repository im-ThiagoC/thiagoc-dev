import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

// Deliberately middleware.ts, NOT Next 16's proxy.ts: proxy runs on the
// Node.js runtime, which @opennextjs/cloudflare does not support
// (https://github.com/opennextjs/opennextjs-cloudflare/issues/962).
// middleware.ts is deprecated in Next 16 but still runs on the edge
// runtime, which OpenNext bundles into the Worker.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|.*\\..*).*)",
};
