import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllNewsIds, getNewsById, getRelatedNews, type NewsItem } from "@/lib/news";
import { getToolBySlug } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

const categoryClasses: Record<NewsItem["category"], string> = {
  launch: "border-emerald/30 bg-emerald/10 text-emerald",
  update: "border-blue/30 bg-blue/10 text-blue-300",
  funding: "border-amber/30 bg-amber/10 text-amber",
  research: "border-purple/30 bg-purple/10 text-purple-200",
};

function buildTakeaways(headline: string, summary: string, category: string, tags: string[]) {
  const coreTag = tags[0] ? formatCategoryName(tags[0].replace(/-/g, " ")) : "product strategy";
  return [
    `${headline} signals faster competition in ${formatCategoryName(category)} tooling.`,
    `For creators and teams, the practical impact is ${summary.toLowerCase()}`,
    `Priority next step: evaluate whether ${coreTag} capability changes your current stack decisions.`,
  ];
}

export async function generateStaticParams() {
  return getAllNewsIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsById(id);
  if (!item) return {};

  return {
    title: `${item.headline} | AI Tool News`,
    description: item.summary,
    alternates: {
      canonical: `/news/${item.id}`,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getNewsById(id);
  if (!item) notFound();

  const relatedTool = item.tool ? getToolBySlug(item.tool) : null;
  const relatedNews = getRelatedNews(item.id, 4);
  const takeaways = buildTakeaways(item.headline, item.summary, item.category, item.tags);

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: item.headline,
            description: item.summary,
            datePublished: item.publishedAt,
            dateModified: item.publishedAt,
            mainEntityOfPage: `/news/${item.id}`,
            articleSection: formatCategoryName(item.category),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "News", item: "/news" },
              { "@type": "ListItem", position: 3, name: item.headline, item: `/news/${item.id}` },
            ],
          },
        ]}
      />

      <article className="section-shell pt-14">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-foreground">
              News
            </Link>
            <span>/</span>
            <span className="text-foreground">Update</span>
          </div>

          <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${categoryClasses[item.category]}`}>
            {item.category}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{item.headline}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{item.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>{item.publishedAt}</span>
            <span>2 min read</span>
            <Link href={item.source} target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan/80">
              Original source
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-extrabold text-foreground">Why this matters</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              This update is relevant because it affects output quality, workflow speed, and pricing pressure across competing tools. Teams that evaluate
              changes early usually make better stack decisions and avoid reactive migrations later.
            </p>

            <h3 className="mt-7 text-xl font-bold text-foreground">Key takeaways</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-7 text-muted">
              {takeaways.map((entry) => (
                <li key={entry} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  {entry}
                </li>
              ))}
            </ul>

            <h3 className="mt-7 text-xl font-bold text-foreground">Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </section>

          <aside className="grid gap-6">
            {relatedTool ? (
              <section className="glass-card rounded-[30px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Related Tool</p>
                <h2 className="mt-3 text-2xl font-extrabold text-foreground">{relatedTool.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{relatedTool.tagline}</p>
                <div className="mt-5 flex gap-2">
                  <Link href={`/tools/${relatedTool.id}`} className="button-primary button-glow px-5">
                    View Tool
                  </Link>
                  <Link href={`/compare?tools=${relatedTool.id}`} className="button-secondary px-5">
                    Compare
                  </Link>
                </div>
              </section>
            ) : null}

            <section className="glass-card rounded-[30px] p-6">
              <h2 className="text-2xl font-extrabold text-foreground">More AI updates</h2>
              <div className="mt-4 grid gap-3">
                {relatedNews.map((entry) => (
                  <Link key={entry.id} href={`/news/${entry.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-white/20">
                    <p className="text-sm font-semibold text-foreground">{entry.headline}</p>
                    <p className="mt-1 text-xs text-muted">{entry.publishedAt}</p>
                  </Link>
                ))}
              </div>
              <Link href="/news" className="mt-5 inline-flex text-sm font-semibold text-cyan hover:text-cyan/80">
                View all news
              </Link>
            </section>
          </aside>
        </div>
      </article>
    </PageTransition>
  );
}
