import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("title")}
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p className="font-mono text-sm text-primary">{t("paragraph3")}</p>
        </div>
      </Reveal>
    </section>
  );
}
