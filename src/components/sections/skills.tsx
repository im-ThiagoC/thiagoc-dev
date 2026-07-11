import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    key: "frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    key: "backend",
    skills: [
      "Node.js",
      "NestJS",
      "tRPC",
      "Prisma",
      "Drizzle ORM",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    key: "systems",
    skills: [
      "C",
      "C++",
      "Embedded Systems",
      "Firmware",
      "Algorithms",
      "High-Performance Computing",
    ],
  },
  {
    key: "tools",
    skills: ["Git", "Docker", "Cloudflare", "Vercel", "Inngest"],
  },
] as const;

export async function Skills() {
  const t = await getTranslations("skills");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.key} delay={index * 0.05}>
            <div className="rounded-xl border border-border/60 p-5">
              <h3 className="font-mono text-sm font-medium text-primary">
                {t(group.key)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="font-mono text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
