import { setRequestLocale } from "next-intl/server";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { featuredProjects } from "@/data/projects";
import { getAllRepoStats } from "@/lib/github";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = await getAllRepoStats(featuredProjects.map((p) => p.repo));

  return (
    <>
      <Hero />
      <FeaturedProjects stats={stats} />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
