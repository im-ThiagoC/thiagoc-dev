import { getTranslations } from "next-intl/server";

import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "thiagoc.dev";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return ogImage({
    title: t("name"),
    subtitle: t("tagline"),
    badges: ["Embedded Systems", "C / C++", "Next.js", "TypeScript", "React"],
  });
}
