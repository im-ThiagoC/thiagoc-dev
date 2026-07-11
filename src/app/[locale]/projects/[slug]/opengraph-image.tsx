import { getProject } from "@/data/projects";
import { routing, type Locale } from "@/i18n/routing";
import { ogImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Project";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  const typedLocale: Locale = (routing.locales as readonly string[]).includes(
    locale,
  )
    ? (locale as Locale)
    : routing.defaultLocale;

  return ogImage({
    title: project?.name ?? "thiagoc.dev",
    subtitle: project?.tagline[typedLocale] ?? "",
    badges: project?.stack ?? [],
    accent: project?.accent,
  });
}
