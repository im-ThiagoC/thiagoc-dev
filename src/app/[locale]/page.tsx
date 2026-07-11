import { getTranslations, setRequestLocale } from "next-intl/server";

import { FadeIn } from "@/components/motion/reveal";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6">
      <FadeIn>
        <p className="font-mono text-sm text-muted-foreground">
          {t("greeting")}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("name")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          {t("tagline")}
        </p>
      </FadeIn>
    </section>
  );
}
