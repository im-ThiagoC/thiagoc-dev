import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { FadeIn } from "@/components/motion/reveal";
import { CategoryFilter } from "@/components/projects/category-filter";
import { ProjectCard } from "@/components/projects/project-card";
import { projects, type ProjectCategory } from "@/data/projects";
import { getAllRepoStats } from "@/lib/github";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title"), description: t("subtitle") };
}

const CATEGORIES: ProjectCategory[] = ["web", "systems"];

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { category } = await searchParams;
  const active = CATEGORIES.find((c) => c === category);
  const visible = active
    ? projects.filter((p) => p.category === active)
    : projects;

  const t = await getTranslations("projects");
  const stats = await getAllRepoStats(visible.map((p) => p.repo));

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <FadeIn>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-8">
        <CategoryFilter active={active} />
      </FadeIn>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {visible.map((project, index) => (
            <FadeIn key={project.slug} delay={0.1 + index * 0.04}>
              <ProjectCard
                project={project}
                stats={stats.get(project.repo) ?? null}
              />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}
