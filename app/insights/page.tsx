import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Radar, Sparkles, TrendingUp } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { siteConfig } from "@/lib/site";
import { getAllTools, getRecentlyUpdatedTools } from "@/lib/tools";
import { getAllTutorials } from "@/lib/tutorials";
import { formatCategoryName, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Insights Hub",
  description:
    "Advanced intelligence for builders: high-signal AI tool updates, launch momentum, and expert playbooks for execution.",
  alternates: {
    canonical: "/insights",
  },
};

export default async function InsightsPage() {
  const allTools = getAllTools();
  const updatedTools = getRecentlyUpdatedTools(8);
  const latestNews = getLatestNews(10);
  const tutorials = await getAllTutorials();
  const advancedTutorials = tutorials.filter((entry) => entry.difficulty === "advanced").slice(0, 6);
  const pulse = getNewsPulse();

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AI Insights Hub",
          description:
            "Advanced AI tools intelligence with latest launches, updates, and practical implementation playbooks.",
          url: `${siteConfig.url}/insights`,
        }}
      />

      <section className="section-shell pt-14">
        <div className="max-w-4xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Intelligence Desk</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Advanced market intelligence for AI operators</h1>
          <p className="mt-4 text-lg text-muted">
            Not just headlines. We track product moves, surface strategic signals, and translate updates into execution
            priorities for builders, agencies, and growth teams.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <PulseCard icon={<Radar size={18} />} value={pulse.weeklyUpdates.toString()} label="Updates in last 7 days" />
          <PulseCard icon={<Sparkles size={18} />} value={pulse.monthlyLaunches.toString()} label="Launches in last 30 days" />
          <PulseCard icon={<TrendingUp size={18} />} value={`${allTools.length}+`} label="Tools actively tracked" />
        </div>

        <div className="mt-8 grid min-w-0 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 glass-card rounded-[30px] p-5 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <h2 className="min-w-0 text-xl font-extrabold text-foreground sm:text-2xl">Top signals this week</h2>
              <Link href="/news" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
                Open news
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-3">
              {latestNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/20">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan">
                      {formatCategoryName(item.category)}
                    </span>
                    <span className="text-xs uppercase tracking-[0.12em] text-muted">{item.publishedAt}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">{item.headline}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-6">
            <section className="glass-card rounded-[30px] p-5 sm:p-6">
              <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Fresh tools to evaluate</h2>
              <div className="mt-4 grid gap-2.5">
                {updatedTools.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 hover:border-white/20">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <p className="min-w-0 truncate text-sm font-semibold text-foreground">{tool.name}</p>
                      <span className="shrink-0 text-xs text-muted">{tool.lastUpdated}</span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-cyan">{formatCategoryName(tool.category)}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-[30px] p-5 sm:p-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Advanced playbooks</h2>
                <Link href="/tutorials?level=advanced" className="shrink-0 text-sm font-semibold text-cyan hover:text-cyan/80">
                  More
                </Link>
              </div>
              <div className="grid gap-3">
                {advancedTutorials.map((entry) => (
                  <Link key={entry.slug} href={`/tutorials/${entry.slug}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/20">
                    <p className="line-clamp-2 text-sm font-semibold text-foreground">{entry.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {entry.readTime} · Updated {formatDate(entry.date)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function PulseCard({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card rounded-[22px] px-5 py-4">
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan">
        {icon}
      </div>
      <p className="text-3xl font-extrabold text-foreground">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}
