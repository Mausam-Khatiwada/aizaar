import Link from "next/link";

import type { NewsItem } from "@/lib/news";

export function AiBriefPanel({
  pulse,
  items,
  title = "AI Brief",
  description = "Fresh headlines and the weekly pulse of launches, updates, and funding moves.",
}: {
  pulse: { weeklyUpdates: number; monthlyLaunches: number; monthlyFunding: number };
  items: NewsItem[];
  title?: string;
  description?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="min-w-0">
      <div className="glass-card rounded-[32px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">{title}</p>
            <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">{description}</p>
          </div>
          <Link href="/news" className="inline-flex shrink-0 text-sm font-semibold text-cyan hover:text-cyan/80">
            Open news desk
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Updates (7D)" value={pulse.weeklyUpdates} />
          <Stat label="Launches (30D)" value={pulse.monthlyLaunches} />
          <Stat label="Funding (30D)" value={pulse.monthlyFunding} />
        </div>

        <div className="mt-5 grid gap-2">
          {items.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-white/20"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="min-w-0 truncate text-sm font-semibold text-foreground group-hover:text-cyan">
                  {item.headline}
                </p>
                <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-muted">{item.publishedAt}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}

