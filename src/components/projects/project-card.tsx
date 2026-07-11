import { ArrowUpRightIcon } from "lucide-react";
import { getLocale } from "next-intl/server";

import { GitHubStats } from "@/components/projects/github-stats";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { RepoStats } from "@/lib/github";

const MAX_STACK_BADGES = 4;

export async function ProjectCard({
  project,
  stats,
}: {
  project: Project;
  stats: RepoStats | null;
}) {
  const locale = (await getLocale()) as Locale;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-border"
    >
      <div
        className="relative flex h-36 items-end overflow-hidden px-5 pb-4"
        style={{
          background: `radial-gradient(120% 140% at 20% 0%, ${project.accent}26 0%, transparent 60%)`,
        }}
      >
        <span
          className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-35"
          style={{ backgroundColor: project.accent }}
          aria-hidden
        />
        <span className="font-mono text-2xl font-semibold tracking-tight">
          {project.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 pt-3">
        <p className="text-sm text-muted-foreground">
          {project.tagline[locale]}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_STACK_BADGES).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-xs">
              {tech}
            </Badge>
          ))}
          {project.stack.length > MAX_STACK_BADGES && (
            <Badge variant="outline" className="font-mono text-xs">
              +{project.stack.length - MAX_STACK_BADGES}
            </Badge>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <GitHubStats stats={stats} />
          <ArrowUpRightIcon
            className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
