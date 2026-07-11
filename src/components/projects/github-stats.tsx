import { StarIcon } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import type { RepoStats } from "@/lib/github";

export async function GitHubStats({ stats }: { stats: RepoStats | null }) {
  if (!stats) return null;

  const t = await getTranslations("projects");
  const format = await getFormatter();

  return (
    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <StarIcon className="size-3" aria-hidden />
        {stats.stars}
      </span>
      {stats.languages[0] && <span>{stats.languages[0]}</span>}
      <span>
        {t("updated", {
          date: format.dateTime(new Date(stats.pushedAt), {
            month: "short",
            year: "numeric",
          }),
        })}
      </span>
    </div>
  );
}
