import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type ProjectCategory = "web" | "systems";

export interface Project {
  slug: string;
  /** GitHub repository in the form "owner/name" — drives the live stats. */
  repo: `${string}/${string}`;
  name: string;
  category: ProjectCategory;
  /** Featured projects appear on the home page grid. */
  featured: boolean;
  year: number;
  tagline: Localized;
  description: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  links: { live?: string; repo: string };
  images: { src: string; alt: Localized; width: number; height: number }[];
  /** Accent color used on the project's OG image and card placeholder. */
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "viber",
    repo: "im-ThiagoC/Viber",
    name: "Viber",
    category: "web",
    featured: true,
    year: 2025,
    tagline: {
      pt: "Construa páginas web completas com IA",
      en: "Build complete web pages with AI",
    },
    description: {
      pt: "Plataforma de geração de sites com IA: o usuário descreve o que quer e agentes de IA escrevem, executam e pré-visualizam o código em sandboxes isolados, em tempo real.",
      en: "AI-powered site generation platform: users describe what they want and AI agents write, run and preview the code in isolated sandboxes, in real time.",
    },
    highlights: {
      pt: [
        "Agentes de IA orquestrados com Inngest Agent Kit e o SDK da Anthropic geram código de forma autônoma a partir de prompts",
        "Execução segura do código gerado em sandboxes E2B, com preview ao vivo do resultado",
        "API type-safe de ponta a ponta com tRPC + Zod e persistência com Prisma",
        "Autenticação, billing e rate limiting prontos para produção com Clerk",
      ],
      en: [
        "AI agents orchestrated with Inngest Agent Kit and the Anthropic SDK autonomously generate code from prompts",
        "Safe execution of generated code in E2B sandboxes, with live preview of the result",
        "End-to-end type-safe API with tRPC + Zod and persistence with Prisma",
        "Production-ready auth, billing and rate limiting with Clerk",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Prisma",
      "Inngest",
      "E2B",
      "Anthropic SDK",
      "Clerk",
      "Tailwind CSS",
    ],
    links: {
      live: "https://viber-ai.shop",
      repo: "https://github.com/im-ThiagoC/Viber",
    },
    images: [],
    accent: "#8b5cf6",
  },
  {
    slug: "cobelt",
    repo: "im-ThiagoC/CoBelt",
    name: "CoBelt",
    category: "web",
    featured: true,
    year: 2025,
    tagline: {
      pt: "Automação de workflows com IA",
      en: "AI workflow automation",
    },
    description: {
      pt: "Ferramenta de automação de workflows orientada a IA: fluxos encadeiam múltiplos provedores de modelos (Anthropic, OpenAI, Google) com execução assíncrona confiável.",
      en: "AI-driven workflow automation tool: flows chain multiple model providers (Anthropic, OpenAI, Google) with reliable asynchronous execution.",
    },
    highlights: {
      pt: [
        "Integração multi-provider com o Vercel AI SDK — Anthropic, OpenAI e Google atrás de uma única abstração",
        "Jobs assíncronos duráveis com Inngest para execuções longas de workflows",
        "Autenticação moderna com better-auth e observabilidade com Sentry",
        "API type-safe com tRPC, React Query e Zod",
      ],
      en: [
        "Multi-provider integration with the Vercel AI SDK — Anthropic, OpenAI and Google behind a single abstraction",
        "Durable async jobs with Inngest for long-running workflow executions",
        "Modern authentication with better-auth and observability with Sentry",
        "Type-safe API with tRPC, React Query and Zod",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Vercel AI SDK",
      "tRPC",
      "Prisma",
      "Inngest",
      "better-auth",
      "Sentry",
    ],
    links: {
      repo: "https://github.com/im-ThiagoC/CoBelt",
    },
    images: [],
    accent: "#f59e0b",
  },
  {
    slug: "discord-clone",
    repo: "im-ThiagoC/discord-clone",
    name: "Discord Clone",
    category: "web",
    featured: true,
    year: 2024,
    tagline: {
      pt: "Chat em tempo real com servidores, canais e chamadas",
      en: "Real-time chat with servers, channels and calls",
    },
    description: {
      pt: "Clone full-stack do Discord: servidores com convites, canais de texto, voz e vídeo, mensagens em tempo real via WebSockets e upload de anexos.",
      en: "Full-stack Discord clone: servers with invite links, text, voice and video channels, real-time messaging over WebSockets and file attachments.",
    },
    highlights: {
      pt: [
        "Mensagens em tempo real com Socket.io, com fallback de polling e indicadores de conexão",
        "Servidores, canais e permissões por papel (admin, moderador, membro) modelados com Prisma + PostgreSQL",
        "Canais de voz e vídeo com LiveKit e mensagens diretas 1:1",
        "Infinite scroll de mensagens com paginação por cursor e edição/remoção em tempo real",
      ],
      en: [
        "Real-time messaging with Socket.io, with polling fallback and connection indicators",
        "Servers, channels and role-based permissions (admin, moderator, member) modeled with Prisma + PostgreSQL",
        "Voice and video channels with LiveKit and 1:1 direct messages",
        "Infinite message scroll with cursor pagination and real-time edit/delete",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Socket.io",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    links: {
      live: "https://discord-clone-seven-tan.vercel.app",
      repo: "https://github.com/im-ThiagoC/discord-clone",
    },
    images: [],
    accent: "#6366f1",
  },
  {
    slug: "finance-saas",
    repo: "im-ThiagoC/finance-SaaS",
    name: "Finance SaaS",
    category: "web",
    featured: true,
    year: 2024,
    tagline: {
      pt: "Plataforma de controle de receitas e despesas",
      en: "Income and expense tracking platform",
    },
    description: {
      pt: "SaaS de finanças pessoais com contas, categorias, transações e dashboards — construído com uma API Hono type-safe e Drizzle ORM sobre Postgres serverless.",
      en: "Personal finance SaaS with accounts, categories, transactions and dashboards — built on a type-safe Hono API and Drizzle ORM over serverless Postgres.",
    },
    highlights: {
      pt: [
        "API REST leve com Hono montada dentro do Next.js, validada com Zod de ponta a ponta",
        "Drizzle ORM sobre Neon (Postgres serverless) com schema type-safe e migrations",
        "Dashboards de receitas/despesas com filtros por período e por conta",
        "Importação de transações via CSV e autenticação com Clerk",
      ],
      en: [
        "Lightweight Hono REST API mounted inside Next.js, validated end-to-end with Zod",
        "Drizzle ORM on Neon (serverless Postgres) with a type-safe schema and migrations",
        "Income/expense dashboards with period and account filters",
        "CSV transaction import and authentication with Clerk",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Hono",
      "Drizzle ORM",
      "Neon",
      "Clerk",
      "React Query",
    ],
    links: {
      repo: "https://github.com/im-ThiagoC/finance-SaaS",
    },
    images: [],
    accent: "#10b981",
  },
  {
    slug: "new-tube",
    repo: "im-ThiagoC/new-tube",
    name: "NewTube",
    category: "web",
    featured: false,
    year: 2025,
    tagline: {
      pt: "Plataforma de vídeos inspirada no YouTube",
      en: "Video platform inspired by YouTube",
    },
    description: {
      pt: "Clone do YouTube com feed de vídeos, canais e playlists, construído com Drizzle ORM sobre Postgres serverless e autenticação com Clerk.",
      en: "YouTube clone with video feed, channels and playlists, built with Drizzle ORM on serverless Postgres and Clerk authentication.",
    },
    highlights: {
      pt: [
        "Modelagem relacional de vídeos, canais e playlists com Drizzle ORM + Neon",
        "Autenticação e gerenciamento de usuários com Clerk",
        "UI construída com shadcn/ui e Tailwind CSS",
      ],
      en: [
        "Relational modeling of videos, channels and playlists with Drizzle ORM + Neon",
        "Authentication and user management with Clerk",
        "UI built with shadcn/ui and Tailwind CSS",
      ],
    },
    stack: ["Next.js", "TypeScript", "Drizzle ORM", "Neon", "Clerk"],
    links: {
      repo: "https://github.com/im-ThiagoC/new-tube",
    },
    images: [],
    accent: "#ef4444",
  },
  {
    slug: "user-management",
    repo: "im-ThiagoC/user-management",
    name: "User Management",
    category: "web",
    featured: false,
    year: 2025,
    tagline: {
      pt: "Gestão de usuários e perfis com NestJS + Next.js",
      en: "User and profile management with NestJS + Next.js",
    },
    description: {
      pt: "Aplicação full-stack de gerenciamento de usuários e perfis: backend NestJS com documentação Swagger automática e frontend Next.js 16, ambos em TypeScript.",
      en: "Full-stack user and profile management app: NestJS backend with automatic Swagger docs and a Next.js 16 frontend, both in TypeScript.",
    },
    highlights: {
      pt: [
        "Backend NestJS com validação via class-validator e documentação OpenAPI gerada automaticamente",
        "Frontend Next.js 16 (App Router) consumindo a API tipada",
        "Separação clara de camadas: controllers, services e DTOs",
      ],
      en: [
        "NestJS backend with class-validator validation and auto-generated OpenAPI docs",
        "Next.js 16 (App Router) frontend consuming the typed API",
        "Clear layering: controllers, services and DTOs",
      ],
    },
    stack: ["NestJS", "Next.js", "TypeScript", "Swagger"],
    links: {
      repo: "https://github.com/im-ThiagoC/user-management",
    },
    images: [],
    accent: "#e11d48",
  },
  {
    slug: "url-shortener",
    repo: "im-ThiagoC/url-shortener",
    name: "URL Shortener",
    category: "web",
    featured: false,
    year: 2024,
    tagline: {
      pt: "Encurtador de URLs com cache em Redis",
      en: "URL shortener with Redis caching",
    },
    description: {
      pt: "Encurtador de URLs com API Fastify, persistência em PostgreSQL e cache de redirecionamentos em Redis para latência mínima.",
      en: "URL shortener with a Fastify API, PostgreSQL persistence and Redis-cached redirects for minimal latency.",
    },
    highlights: {
      pt: [
        "API Fastify de alta performance validada com Zod",
        "Cache de redirecionamentos em Redis, reduzindo hits no banco",
        "Contagem de acessos e métricas por link em PostgreSQL",
      ],
      en: [
        "High-performance Fastify API validated with Zod",
        "Redis-cached redirects, cutting database hits",
        "Per-link access counting and metrics in PostgreSQL",
      ],
    },
    stack: ["Fastify", "TypeScript", "PostgreSQL", "Redis"],
    links: {
      repo: "https://github.com/im-ThiagoC/url-shortener",
    },
    images: [],
    accent: "#06b6d4",
  },
  {
    slug: "netflix-clone",
    repo: "im-ThiagoC/netflix-clone",
    name: "Netflix Clone",
    category: "web",
    featured: false,
    year: 2025,
    tagline: {
      pt: "Interface de streaming inspirada na Netflix",
      en: "Streaming interface inspired by Netflix",
    },
    description: {
      pt: "Clone da interface da Netflix construído com Next.js e React, explorando composição de componentes e layout responsivo.",
      en: "Netflix interface clone built with Next.js and React, exploring component composition and responsive layout.",
    },
    highlights: {
      pt: [
        "Layout responsivo com carrosséis de títulos e hero dinâmico",
        "Composição de componentes React com foco em reuso",
      ],
      en: [
        "Responsive layout with title carousels and a dynamic hero",
        "React component composition with a focus on reuse",
      ],
    },
    stack: ["Next.js", "TypeScript", "React"],
    links: {
      repo: "https://github.com/im-ThiagoC/netflix-clone",
    },
    images: [],
    accent: "#dc2626",
  },
  {
    slug: "klotski-otimizado",
    repo: "im-ThiagoC/Klotski-otimizado",
    name: "Klotski Otimizado",
    category: "systems",
    featured: false,
    year: 2025,
    tagline: {
      pt: "Solucionador ultra-otimizado do puzzle Klotski em C",
      en: "Ultra-optimized Klotski puzzle solver in C",
    },
    description: {
      pt: "Solucionador do puzzle Klotski escrito em C com busca em largura otimizada, hashing de estados e estruturas compactas para explorar milhões de posições por segundo.",
      en: "Klotski puzzle solver written in C with optimized breadth-first search, state hashing and compact data structures to explore millions of positions per second.",
    },
    highlights: {
      pt: [
        "Representação compacta de estados do tabuleiro para reduzir uso de memória",
        "Deduplicação de estados via hashing, podando o espaço de busca",
        "Iterado através de 5 versões de otimização, cada uma medida e comparada",
      ],
      en: [
        "Compact board-state representation to reduce memory usage",
        "State deduplication via hashing, pruning the search space",
        "Iterated through 5 optimization versions, each measured and compared",
      ],
    },
    stack: ["C", "Algorithms", "Data Structures"],
    links: {
      repo: "https://github.com/im-ThiagoC/Klotski-otimizado",
    },
    images: [],
    accent: "#f97316",
  },
  {
    slug: "high-performance-computing",
    repo: "im-ThiagoC/high-performance-computing",
    name: "High-Performance Computing",
    category: "systems",
    featured: false,
    year: 2025,
    tagline: {
      pt: "Estudos de computação de alto desempenho em C",
      en: "High-performance computing studies in C",
    },
    description: {
      pt: "Coleção de experimentos de computação de alto desempenho em C: paralelismo, otimização de cache e medição de performance de algoritmos.",
      en: "Collection of high-performance computing experiments in C: parallelism, cache optimization and algorithm performance measurement.",
    },
    highlights: {
      pt: [
        "Experimentos com paralelização e vetorização de algoritmos",
        "Análise de localidade de cache e seu impacto em performance",
      ],
      en: [
        "Experiments with algorithm parallelization and vectorization",
        "Analysis of cache locality and its performance impact",
      ],
    },
    stack: ["C", "OpenMP", "Performance"],
    links: {
      repo: "https://github.com/im-ThiagoC/high-performance-computing",
    },
    images: [],
    accent: "#84cc16",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | undefined;
  next: Project | undefined;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
