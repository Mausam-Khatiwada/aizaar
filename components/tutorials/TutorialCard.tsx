import Link from "next/link";

import type { TutorialMeta } from "@/lib/tutorials";
import { formatDate } from "@/lib/utils";

const difficultyClasses = {
  beginner: "border-emerald/30 bg-emerald/10 text-emerald",
  intermediate: "border-amber/30 bg-amber/10 text-amber",
  advanced: "border-rose/30 bg-rose/10 text-rose-200",
};

export function TutorialCard({ tutorial }: { tutorial: TutorialMeta }) {
  return (
    <article className="glass-card rounded-[24px] border-l-4 border-l-cyan p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {tutorial.category}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${difficultyClasses[tutorial.difficulty]}`}>
          {tutorial.difficulty}
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-muted">{tutorial.readTime}</span>
      </div>

      <h2 className="mt-4 line-clamp-2 text-2xl font-bold text-foreground">{tutorial.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{tutorial.excerpt}</p>

      <div className="mt-5 flex items-center justify-between text-sm text-muted">
        <span>
          {tutorial.author} | {formatDate(tutorial.date)}
        </span>
        <Link href={`/tutorials/${tutorial.slug}`} className="font-semibold text-cyan hover:text-cyan/80">
          Read Guide
        </Link>
      </div>
    </article>
  );
}
