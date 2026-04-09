import type { Metadata } from "next";
import Link from "next/link";

import { TutorialCard } from "@/components/tutorials/TutorialCard";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllTutorials, type TutorialDifficulty } from "@/lib/tutorials";

export const metadata: Metadata = {
  title: "Tutorials",
  description: "Step-by-step AI tool guides for developers, freelancers, and creators from beginner to advanced.",
  alternates: {
    canonical: "/tutorials",
  },
};

const tabs: Array<{ label: string; value: "all" | TutorialDifficulty }> = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default async function TutorialsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const level = (typeof params.level === "string" ? params.level : "all") as "all" | TutorialDifficulty;
  const activeLevel = tabs.some((tab) => tab.value === level) ? level : "all";
  const tutorials = await getAllTutorials();
  const filtered = activeLevel === "all" ? tutorials : tutorials.filter((tutorial) => tutorial.difficulty === activeLevel);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Learn to Use AI Tools</h1>
          <p className="mt-4 text-lg text-muted">
            Step-by-step guides for developers and creators, from beginner setup to advanced workflows.
          </p>
        </div>

        <div className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value === "all" ? "/tutorials" : `/tutorials?level=${tab.value}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeLevel === tab.value
                  ? "border-transparent bg-gradient-to-r from-purple to-cyan text-white"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
