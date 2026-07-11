import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { GitHubIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion/reveal";
import { GitHubStats } from "@/components/projects/github-stats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getRepoStats } from "@/lib/github";
import { JsonLd, localeAlternates, projectJsonLd } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const typedLocale = (
    routing.locales as readonly string[]
  ).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return {
    title: project.name,
    description: project.tagline[typedLocale],
    alternates: localeAlternates(`/projects/${project.slug}`, typedLocale),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const typedLocale = locale as Locale;
  const t = await getTranslations("project");
  const stats = await getRepoStats(project.repo);
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <JsonLd data={projectJsonLd(project, typedLocale)} />
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" aria-hidden />
          {t("backToProjects")}
        </Link>

        <div
          className="mt-6 flex h-40 items-end overflow-hidden rounded-2xl border border-border/60 px-6 pb-5 sm:h-48"
          style={{
            background: `radial-gradient(120% 160% at 15% 0%, ${project.accent}33 0%, transparent 65%)`,
          }}
        >
          <h1 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
        </div>

        <p className="mt-6 text-lg text-pretty text-muted-foreground">
          {project.description[typedLocale]}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <CalendarIcon className="size-3" aria-hidden />
            {project.year}
          </span>
          <GitHubStats stats={stats} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <Button
              nativeButton={false}
              render={
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  {t("liveDemo")}
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
          )}
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={project.links.repo} target="_blank" rel="noreferrer">
                <GitHubIcon data-icon="inline-start" />
                {t("sourceCode")}
              </a>
            }
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Separator className="my-10" />

        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          {t("caseStudy")}
        </h2>
        <ul className="mt-5 space-y-3">
          {project.highlights[typedLocale].map((highlight) => (
            <li key={highlight} className="flex gap-3 text-muted-foreground">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: project.accent }}
                aria-hidden
              />
              {highlight}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-xl font-bold tracking-tight sm:text-2xl">
          {t("stack")}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono">
              {tech}
            </Badge>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <Separator className="my-10" />
        <nav className="flex items-center justify-between gap-4">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {t("previousProject")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-primary">
                <ArrowLeftIcon className="size-3.5" aria-hidden />
                {previous.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {t("nextProject")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-primary">
                {next.name}
                <ArrowRightIcon className="size-3.5" aria-hidden />
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </FadeIn>
    </article>
  );
}
