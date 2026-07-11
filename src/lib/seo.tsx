import type { Metadata } from "next";
import type { Person, SoftwareSourceCode, WithContext } from "schema-dts";

import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

/**
 * hreflang alternates for a route. `path` is the locale-less pathname
 * ("/", "/projects", "/projects/viber").
 */
export function localeAlternates(
  path: string,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `${siteConfig.url}/${locale}${suffix}`,
    languages: {
      "pt-BR": `${siteConfig.url}/pt${suffix}`,
      en: `${siteConfig.url}/en${suffix}`,
      "x-default": `${siteConfig.url}/pt${suffix}`,
    },
  };
}

export function personJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: siteConfig.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.alumniOf,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressCountry: "BR",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };
}

export function projectJsonLd(
  project: Project,
  locale: Locale,
): WithContext<SoftwareSourceCode> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description[locale],
    url: `${siteConfig.url}/${locale}/projects/${project.slug}`,
    codeRepository: project.links.repo,
    programmingLanguage: project.stack[0],
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    ...(project.links.live && { installUrl: project.links.live }),
  };
}

export function JsonLd({ data }: { data: WithContext<Person | SoftwareSourceCode> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
