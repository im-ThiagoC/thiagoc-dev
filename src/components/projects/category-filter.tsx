"use client";

import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import type { ProjectCategory } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const filters: { key: ProjectCategory | "all"; category?: ProjectCategory }[] =
  [
    { key: "all" },
    { key: "web", category: "web" },
    { key: "systems", category: "systems" },
  ];

export function CategoryFilter({ active }: { active?: ProjectCategory }) {
  const t = useTranslations("projects");

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = active === filter.category;
        return (
          <Link
            key={filter.key}
            href={
              filter.category
                ? { pathname: "/projects", query: { category: filter.category } }
                : "/projects"
            }
            scroll={false}
          >
            <Badge
              variant={isActive ? "default" : "outline"}
              className={cn(
                "px-3 py-1 font-mono text-xs transition-colors",
                !isActive && "hover:bg-muted",
              )}
            >
              {t(filter.key)}
            </Badge>
          </Link>
        );
      })}
    </div>
  );
}
