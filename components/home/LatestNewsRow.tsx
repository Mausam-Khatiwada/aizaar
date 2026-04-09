import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NewsItem } from "@/lib/news";

export function LatestNewsRow({ items }: { items: NewsItem[] }) {
  return (
    <section className="section-shell pt-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">What Just Dropped in AI</p>
          <h2 className="section-title">Latest AI news curated for builders</h2>
        </div>
        <Link href="/news" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          View all news
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="glass-card min-w-0 rounded-[24px] p-4">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">
              {item.category}
            </div>
            <h3 className="mt-3 line-clamp-2 text-lg font-bold text-foreground">
              <Link href={`/news/${item.id}`} className="hover:text-cyan">
                {item.headline}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{item.summary}</p>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-muted">
              <span>{item.publishedAt}</span>
              <Link href={`/news/${item.id}`} className="text-cyan hover:text-cyan/80">
                Read
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
