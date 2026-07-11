import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          © {year} {siteConfig.name}. {t("rights")}.
        </p>
        <p className="font-mono text-xs">
          {t("builtWith")} ·{" "}
          <a
            href={siteConfig.repository}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("viewSource")}
          </a>
        </p>
      </div>
    </footer>
  );
}
