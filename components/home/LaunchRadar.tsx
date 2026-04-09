import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NewsItem } from "@/lib/news";

const badgeTone: Record<NewsItem["category"], string> = {
  launch: "border-emerald/30 bg-emerald/10 text-emerald",
  update: "border-blue/30 bg-blue/10 text-blue-300",
  funding: "border-amber/30 bg-amber/10 text-amber",
  research: "border-purple/30 bg-purple/10 text-purple-200",
};

export function LaunchRadar({ items }: { items: NewsItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-shell pt-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Launch Radar</p>
          <h2 className="section-title">Latest tool moves worth tracking this week</h2>
        </div>
        <Link href="/news" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          Open full news desk
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="glass-card min-w-0 rounded-[24px] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${badgeTone[item.category]}`}>
                {item.category}
              </span>
              <span className="shrink-0 text-xs uppercase tracking-[0.13em] text-muted">{item.publishedAt}</span>
            </div>
            <h3 className="mt-4 line-clamp-2 text-xl font-bold text-foreground">{item.headline}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted">{item.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <Link href={`/news/${item.id}`} className="text-sm font-semibold text-cyan hover:text-cyan/80">
                Read full update
              </Link>
              <Link href={item.source} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-[0.12em] text-muted hover:text-foreground">
                Source
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
