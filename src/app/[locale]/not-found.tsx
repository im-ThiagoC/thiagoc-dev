import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <Button
        nativeButton={false}
        render={<Link href="/">{t("back")}</Link>}
        className="mt-2"
      />
    </section>
  );
}
