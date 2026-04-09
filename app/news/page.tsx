import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getFeaturedNews, getNewsByCategory, getNewsPulse, type NewsCategory } from "@/lib/news";
import { getRecentlyUpdatedTools } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Tool News",
  description: "Latest launches, updates, funding rounds, and research moves across the AI tools ecosystem.",
  alternates: {
    canonical: "/news",
  },
};

const tabItems: Array<{ label: string; value: NewsCategory }> = [
  { label: "All", value: "all" },
  { label: "Launches", value: "launch" },
  { label: "Updates", value: "update" },
  { label: "Funding", value: "funding" },
  { label: "Research", value: "research" },
];

const categoryClasses: Record<Exclude<NewsCategory, "all">, string> = {
  launch: "border-emerald/30 bg-emerald/10 text-emerald",
  update: "border-blue/30 bg-blue/10 text-blue-300",
  funding: "border-amber/30 bg-amber/10 text-amber",
  research: "border-purple/30 bg-purple/10 text-purple-200",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const active = (typeof params.category === "string" ? params.category : "all") as NewsCategory;
  const activeCategory = tabItems.some((tab) => tab.value === active) ? active : "all";
  const featured = getFeaturedNews();
  const news = getNewsByCategory(activeCategory);
  const pulse = getNewsPulse();
  const watchlist = getRecentlyUpdatedTools(5);

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AI Tool News",
          description: "Latest launches, updates, and funding in AI tools.",
        }}
      />

      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">AI Tool News</h1>
          <p className="mt-4 text-lg text-muted">Latest launches, updates, and funding in AI tools.</p>
        </div>

        <div className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
          {tabItems.map((tab) => (
            <Link
              key={tab.value}
              href={tab.value === "all" ? "/news" : `/news?category=${tab.value}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === tab.value
                  ? "border-transparent bg-gradient-to-r from-purple to-cyan text-white"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="glass-card rounded-2xl px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Updates 7D</p>
            <p className="mt-1 text-2xl font-extrabold text-foreground">{pulse.weeklyUpdates}</p>
          </div>
          <div className="glass-card rounded-2xl px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Launches 30D</p>
            <p className="mt-1 text-2xl font-extrabold text-foreground">{pulse.monthlyLaunches}</p>
          </div>
          <div className="glass-card rounded-2xl px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Funding 30D</p>
            <p className="mt-1 text-2xl font-extrabold text-foreground">{pulse.monthlyFunding}</p>
          </div>
        </div>

        <section className="glass-card mt-6 rounded-[24px] p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <h2 className="text-xl font-bold text-foreground">Latest tools watchlist</h2>
            <Link href="/tools/new" className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-cyan hover:text-cyan/80">
              New tools
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {watchlist.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 hover:border-white/20">
                <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-cyan">{formatCategoryName(tool.category)}</p>
                <p className="mt-2 text-xs text-muted">Updated {tool.lastUpdated}</p>
              </Link>
            ))}
          </div>
        </section>

        {featured ? (
          <article className="glass-card mt-8 rounded-[30px] p-7">
            <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${categoryClasses[featured.category]}`}>
              Featured {featured.category}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-foreground">
              <Link href={`/news/${featured.id}`} className="hover:text-cyan">
                {featured.headline}
              </Link>
            </h2>
            <p className="mt-3 max-w-3xl text-muted">{featured.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span>{featured.publishedAt}</span>
              <Link href={`/news/${featured.id}`} className="text-cyan hover:text-cyan/80">
                Read analysis
              </Link>
              <Link href={featured.source} target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan/80">
                Source
              </Link>
            </div>
          </article>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {news.map((item) => (
            <article key={item.id} className="glass-card rounded-[24px] p-5">
              <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${categoryClasses[item.category]}`}>
                {item.category}
              </div>
              <h3 className="mt-4 line-clamp-2 text-xl font-bold text-foreground">
                <Link href={`/news/${item.id}`} className="hover:text-cyan">
                  {item.headline}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted">{item.summary}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                <span>{item.publishedAt}</span>
                <div className="flex items-center gap-3">
                  <Link href={`/news/${item.id}`} className="text-cyan hover:text-cyan/80">
                    Read
                  </Link>
                  <Link href={item.source} target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan/80">
                    Source
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
