import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];

  return paths.map((path) => ({
    url: `${siteConfig.url}/pt${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.8 : 0.6,
    alternates: {
      languages: {
        "pt-BR": `${siteConfig.url}/pt${path}`,
        en: `${siteConfig.url}/en${path}`,
      },
    },
  }));
}
