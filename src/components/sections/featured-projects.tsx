import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { RepoStats } from "@/lib/github";

export async function FeaturedProjects({
  stats,
}: {
  stats: Map<string, RepoStats>;
}) {
  const t = await getTranslations("featured");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard
              project={project}
              stats={stats.get(project.repo) ?? null}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <Button
          variant="ghost"
          nativeButton={false}
          render={
            <Link href="/projects">
              {t("viewAll")}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          }
        />
      </Reveal>
    </section>
  );
}
