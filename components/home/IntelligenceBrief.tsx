import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Radar, Sparkles, TrendingUp } from "lucide-react";

import type { NewsItem } from "@/lib/news";
import type { Tool } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

type IntelligenceStats = {
  weeklyUpdates: number;
  monthlyLaunches: number;
  activeTools: number;
};

export function IntelligenceBrief({
  news,
  tools,
  stats,
}: {
  news: NewsItem[];
  tools: Tool[];
  stats: IntelligenceStats;
}) {
  if (news.length === 0) {
    return null;
  }

  return (
    <section className="section-shell pt-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Operator Brief</p>
          <h2 className="section-title">High-signal intelligence for teams moving fast</h2>
          <p className="section-copy mt-3 max-w-3xl">
            Track meaningful product moves, spot newest tool upgrades, and prioritize what to test this week.
          </p>
        </div>
        <Link href="/news" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          Open full coverage
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile icon={<Radar size={17} />} label="Updates This Week" value={stats.weeklyUpdates.toString()} />
        <StatTile icon={<Sparkles size={17} />} label="Launches This Month" value={stats.monthlyLaunches.toString()} />
        <StatTile icon={<TrendingUp size={17} />} label="Tools Tracked" value={`${stats.activeTools}+`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-card rounded-[26px] p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2 gap-y-3 sm:items-center">
            <h3 className="min-w-0 text-lg font-bold text-foreground sm:text-xl">Latest AI and product signals</h3>
            <Link href="/news" className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-cyan hover:text-cyan/80">
              View all
            </Link>
          </div>
          <div className="grid gap-3">
            {news.slice(0, 6).map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-white/20">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">{formatCategoryName(item.category)}</span>
                  <span className="text-xs uppercase tracking-[0.12em] text-muted">{item.publishedAt}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">{item.headline}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[26px] p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-2 gap-y-3 sm:items-center">
            <h3 className="min-w-0 text-lg font-bold text-foreground sm:text-xl">Recently updated tools</h3>
            <Link href="/tools/new" className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-cyan hover:text-cyan/80">
              See newest
            </Link>
          </div>
          <div className="grid gap-2.5">
            {tools.slice(0, 7).map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:border-white/20 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{tool.name}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted">{formatCategoryName(tool.category)}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xs text-muted">{tool.lastUpdated}</p>
                  <p className="text-xs font-semibold text-cyan">{tool.rating.overall.toFixed(1)} rating</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl px-4 py-3">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-cyan">
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  );
}
