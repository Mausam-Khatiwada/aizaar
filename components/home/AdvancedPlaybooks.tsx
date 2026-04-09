import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { TutorialMeta } from "@/lib/tutorials";
import { formatDate } from "@/lib/utils";

export function AdvancedPlaybooks({ tutorials }: { tutorials: TutorialMeta[] }) {
  const advanced = tutorials
    .filter((item) => item.difficulty === "advanced")
    .slice(0, 4);

  if (advanced.length === 0) {
    return null;
  }

  return (
    <section className="section-shell pt-0">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Advanced Content</p>
          <h2 className="section-title">High-level playbooks for builders who ship fast</h2>
          <p className="section-copy mt-3">
            Deep dives for production workflows, architecture tradeoffs, and monetization strategies.
          </p>
        </div>
        <Link href="/tutorials?level=advanced" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          View advanced guides
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {advanced.map((tutorial) => (
          <article key={tutorial.slug} className="glass-card rounded-[26px] p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em]">
              <span className="rounded-full border border-rose/30 bg-rose/10 px-2.5 py-1 font-semibold text-rose-200">
                Advanced
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-muted">
                {tutorial.readTime}
              </span>
              <span className="text-muted">{formatDate(tutorial.date)}</span>
            </div>

            <h3 className="text-2xl font-bold text-foreground">{tutorial.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{tutorial.excerpt}</p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{tutorial.category}</span>
              <Link href={`/tutorials/${tutorial.slug}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
                Read tutorial
                <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
