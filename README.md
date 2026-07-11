# thiagoc.dev

Personal portfolio — built with Next.js 16, TypeScript and shadcn/ui, deployed to **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare).

**Live:** [thiagoc.dev](https://thiagoc.dev)

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (base-nova / Base UI)
- [next-intl](https://next-intl.dev) — bilingual PT-BR/EN with locale-prefixed routes
- [Motion](https://motion.dev) — scroll reveals honoring `prefers-reduced-motion`
- [@opennextjs/cloudflare](https://opennext.js.org/cloudflare) — SSR/ISR on Cloudflare Workers

## Architecture highlights

- **ISR on Workers**: data-cache entries persist in an R2 bucket with a
  Durable Object queue serializing revalidations (`open-next.config.ts`).
- **Live GitHub stats**: stars/language/last-push fetched server-side with
  `revalidate: 3600` and a graceful fallback when rate-limited (`src/lib/github.ts`).
- **Dynamic OG images**: per-project `ImageResponse` cards with CDN-loaded
  Geist and built-in font fallback (`src/lib/og.tsx`).
- **SEO**: hreflang alternates on every page, localized sitemap, JSON-LD
  (`Person`, `SoftwareSourceCode`) typed with `schema-dts`.
- **Single source of truth**: `src/data/projects.ts` drives pages, OG images,
  sitemap and GitHub fetches; missing translations fail the build.

## Development

```bash
pnpm install
pnpm dev        # Next.js dev server (Turbopack)
pnpm preview    # production build served by workerd (Workers runtime)
```

Optional: put `GITHUB_TOKEN=...` in `.dev.vars` to raise the GitHub API
rate limit (site works without it — stats just disappear when limited).

## Deploy (Cloudflare)

One-time setup:

```bash
npx wrangler login
npx wrangler r2 bucket create thiagoc-dev-inc-cache
npx wrangler secret put GITHUB_TOKEN   # optional
```

Then:

```bash
pnpm deploy
```

The `routes` entry in `wrangler.jsonc` (`custom_domain: true`) provisions
DNS + certificate for `thiagoc.dev` automatically on the Cloudflare zone.

## Windows notes

Two deliberate deviations that keep the OpenNext build working on Windows:

- `pnpm-workspace.yaml` sets `nodeLinker: hoisted` — pnpm's symlinked
  layout breaks esbuild file tracing during the OpenNext build.
- `pnpm build` uses `next build --webpack` — Turbopack's bracket-named
  chunks (`[root-of-the-server]__*.js`) fail to resolve in the bundled
  Worker on Windows.
- `src/middleware.ts` (not `proxy.ts`) — OpenNext does not support Node.js
  middleware yet ([#962](https://github.com/opennextjs/opennextjs-cloudflare/issues/962)).
