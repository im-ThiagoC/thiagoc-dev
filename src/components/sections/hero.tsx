import { ArrowRightIcon, MapPinIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { GitHubIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32">
      <FadeIn>
        <p className="font-mono text-sm text-primary">{t("greeting")}</p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {t("name")}
        </h1>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-muted-foreground sm:text-3xl">
          {t("role")}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
          {t("tagline")}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
          <MapPinIcon className="size-3.5" aria-hidden />
          {t("location")}
        </p>
      </FadeIn>
      <FadeIn delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
        <Button
          size="lg"
          nativeButton={false}
          render={
            <Link href="/projects">
              {t("viewProjects")}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          }
        />
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <GitHubIcon data-icon="inline-start" />
              {t("githubProfile")}
            </a>
          }
        />
      </FadeIn>
    </section>
  );
}
