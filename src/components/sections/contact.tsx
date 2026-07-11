import { MailIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 pb-24 sm:px-6"
    >
      <Reveal>
        <div className="rounded-2xl border border-border/60 bg-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={
                <a href={`mailto:${siteConfig.email}`}>
                  <MailIcon data-icon="inline-start" />
                  {t("email")}
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              aria-label="GitHub"
              render={
                <a href={siteConfig.github} target="_blank" rel="noreferrer">
                  <GitHubIcon />
                </a>
              }
            />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              aria-label="LinkedIn"
              render={
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                </a>
              }
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
