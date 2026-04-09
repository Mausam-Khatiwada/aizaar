import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateDisclosure } from "@/components/tools/AffiliateDisclosure";
import { CommunityReviews } from "@/components/tools/CommunityReviews";
import { FaqAccordion } from "@/components/tools/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsRail } from "@/components/tools/RelatedToolsRail";
import { ToolHero } from "@/components/tools/ToolHero";
import { PageTransition } from "@/components/ui/PageTransition";
import { Badge } from "@/components/ui/Badge";
import {
  getAllTools,
  getAlternativeTools,
  getCategoryBySlug,
  getRelatedTools,
  getToolBySlug,
} from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { formatCategoryName, formatDate } from "@/lib/utils";
import { getReviewsForTool, getReviewSummary } from "@/lib/reviews";
import { getAllTutorials } from "@/lib/tutorials";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({
    slug: tool.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} Review`,
    description: `${tool.tagline}. Pricing, ratings, pros, cons, alternatives, and our verdict on ${tool.name}.`,
    alternates: {
      canonical: `/tools/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} Review`,
      description: tool.description,
    },
    twitter: {
      title: `${tool.name} Review`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const alternatives = getAlternativeTools(tool);
  const relatedTools = getRelatedTools(tool, 3);
  const reviews = getReviewsForTool(tool.id);
  const reviewSummary = getReviewSummary(reviews);
  const tutorials = (await getAllTutorials())
    .filter((tutorial) => tutorial.category.toLowerCase().includes(formatCategoryName(tool.category).split(" ")[0].toLowerCase()) || tutorial.title.toLowerCase().includes(tool.name.toLowerCase()))
    .slice(0, 2);
  const compareHref = `/compare?tools=${[tool.id, alternatives[0]?.id].filter(Boolean).join(",")}`;

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            applicationCategory: formatCategoryName(tool.category),
            operatingSystem: tool.platforms.join(", "),
            offers: {
              "@type": "Offer",
              price: tool.pricing.startingPrice.replace(/[^0-9.]/g, "") || "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: tool.rating.overall,
              reviewCount: tool.reviewCount,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "SoftwareApplication",
              name: tool.name,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: tool.rating.overall,
              bestRating: 5,
            },
            reviewBody: tool.verdict,
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: tool.name,
            description: tool.description,
            brand: {
              "@type": "Brand",
              name: tool.name,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: tool.pricing.startingPrice.replace(/[^0-9.]/g, "") || "0",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: tool.rating.overall,
              reviewCount: tool.reviewCount,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `How to get started with ${tool.name}`,
            description: `Three-step setup guide for ${tool.name}.`,
            step: [
              { "@type": "HowToStep", name: `Create your ${tool.name} account` },
              { "@type": "HowToStep", name: "Run your first core workflow" },
              { "@type": "HowToStep", name: "Save a reusable template for faster output" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tool.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: category?.name ?? tool.category, item: `/categories/${tool.category}` },
              { "@type": "ListItem", position: 3, name: tool.name, item: `/tools/${tool.id}` },
            ],
          },
        ]}
      />

      <ToolHero tool={tool} compareHref={compareHref} shareUrl={`${siteConfig.url}/tools/${tool.id}`} />

      <section className="section-shell pb-0 pt-8">
        <div className="floating-border rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Quick Verdict</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Our score</p>
              <p className="mt-1 text-3xl font-extrabold text-foreground">{tool.rating.overall.toFixed(1)} / 5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Best for</p>
              <p className="mt-1 font-semibold text-foreground">{tool.bestFor}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Not for</p>
              <p className="mt-1 font-semibold text-foreground">{tool.cons[0]}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Pricing</p>
              <p className="mt-1 font-semibold text-foreground">
                From {tool.pricing.startingPrice} {tool.pricing.hasFree ? "| Free plan available" : ""}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted">Updated {formatDate(tool.lastUpdated)}</p>
        </div>
      </section>

      <div className="section-shell grid min-w-0 gap-10 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
        <div className="min-w-0 space-y-12">
          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">
              What is {tool.name}?
            </p>
            <div className="space-y-4 text-lg leading-8 text-muted">
              <p>{tool.description}</p>
              <p>
                In this directory, we place {tool.name} inside <Link href={`/categories/${tool.category}`} className="text-cyan hover:text-cyan/80">{category?.name ?? formatCategoryName(tool.category)}</Link> because it performs especially well for {tool.bestFor.toLowerCase()}. It is most compelling when you value {tool.tags.slice(0, 2).join(" and ")} over generic breadth.
              </p>
            </div>
          </section>

          <section className="glass-card rounded-[32px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Quick Answer</p>
            <p className="mt-3 text-lg leading-8 text-foreground">{tool.quickAnswer}</p>
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Key Features</p>
            <div className="grid gap-5 md:grid-cols-2">
              {tool.highlights.map((feature) => (
                <div key={feature.title} className="glass-card rounded-[28px] p-5">
                  <h2 className="text-xl font-bold text-foreground">{feature.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="glass-card rounded-[28px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald">Pros</p>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                {tool.pros.map((item) => (
                  <li key={item} className="rounded-2xl border border-emerald/20 bg-emerald/5 px-4 py-3 text-foreground/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-[28px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose">Cons</p>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                {tool.cons.map((item) => (
                  <li key={item} className="rounded-2xl border border-rose/20 bg-rose/5 px-4 py-3 text-foreground/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Pricing Breakdown</p>
            <div className="table-scroll rounded-[28px] border border-white/10">
              <table className="premium-table min-w-[520px] sm:min-w-full">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Key Features</th>
                    <th>Limit</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      plan: "Free",
                      price: "$0",
                      features: tool.pricing.hasFree ? tool.pricing.freeDetails : "No free plan",
                      limit: tool.pricing.hasFree ? "Limited credits" : "-",
                      bestFor: "Beginners",
                    },
                    {
                      plan: "Pro",
                      price: tool.pricing.paidPlans[0] ?? tool.pricing.startingPrice,
                      features: tool.highlights.slice(0, 2).map((item) => item.title).join(", "),
                      limit: "Higher monthly usage",
                      bestFor: "Freelancers",
                    },
                    {
                      plan: "Business",
                      price: tool.pricing.paidPlans[1] ?? tool.pricing.paidPlans[0] ?? tool.pricing.startingPrice,
                      features: "All core features + team controls",
                      limit: "Priority limits",
                      bestFor: "Teams",
                    },
                  ].map((row, index) => (
                    <tr key={row.plan}>
                      <td className="font-semibold text-foreground">
                        {row.plan}
                        {index === 1 ? (
                          <span className="ml-2 rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-cyan">
                            Most Popular
                          </span>
                        ) : null}
                      </td>
                      <td>{row.price}</td>
                      <td>{row.features}</td>
                      <td>{row.limit}</td>
                      <td>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Who is it best for?</p>
            <div className="grid gap-5 md:grid-cols-3">
              {tool.personas.map((persona) => (
                <div key={persona.title} className="glass-card rounded-[28px] p-5">
                  <h3 className="text-xl font-bold text-foreground">{persona.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{persona.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Getting started in 3 steps</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass-card rounded-[24px] p-5">
                <div className="text-4xl font-black gradient-text">01</div>
                <p className="mt-3 text-sm text-muted">Create a free account on {tool.name} and complete the onboarding checklist.</p>
              </div>
              <div className="glass-card rounded-[24px] p-5">
                <div className="text-4xl font-black gradient-text">02</div>
                <p className="mt-3 text-sm text-muted">Run your first focused workflow with one clear prompt and one clear output target.</p>
              </div>
              <div className="glass-card rounded-[24px] p-5">
                <div className="text-4xl font-black gradient-text">03</div>
                <p className="mt-3 text-sm text-muted">Save successful settings as templates so your next project ships faster.</p>
              </div>
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">How it compares</p>
            <div className="table-scroll rounded-[28px] border border-white/10">
              <table className="premium-table min-w-[560px] sm:min-w-[640px] lg:min-w-[720px]">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>{tool.name}</th>
                    {alternatives.slice(0, 2).map((alternative) => (
                      <th key={alternative.id}>{alternative.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-foreground">Price</td>
                    <td>{tool.pricing.startingPrice}</td>
                    {alternatives.slice(0, 2).map((alternative) => (
                      <td key={`${alternative.id}-price`}>{alternative.pricing.startingPrice}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold text-foreground">Free Plan</td>
                    <td>{tool.pricing.hasFree ? "Yes" : "No"}</td>
                    {alternatives.slice(0, 2).map((alternative) => (
                      <td key={`${alternative.id}-free`}>{alternative.pricing.hasFree ? "Yes" : "No"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold text-foreground">Best Feature</td>
                    <td>{tool.highlights[0]?.title ?? tool.tags[0]}</td>
                    {alternatives.slice(0, 2).map((alternative) => (
                      <td key={`${alternative.id}-feature`}>{alternative.highlights[0]?.title ?? alternative.tags[0]}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-semibold text-foreground">Rating</td>
                    <td className="bg-emerald/10 text-foreground">{tool.rating.overall.toFixed(1)}</td>
                    {alternatives.slice(0, 2).map((alternative) => (
                      <td key={`${alternative.id}-rating`}>{alternative.rating.overall.toFixed(1)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {alternatives.slice(0, 2).map((alternative) => (
                <Link key={alternative.id} href={`/compare?tools=${tool.id},${alternative.id}`} className="inline-flex text-sm font-semibold text-cyan">
                  Compare with {alternative.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[32px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Our Verdict</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="text-5xl font-extrabold text-foreground">{tool.rating.overall.toFixed(1)}</div>
              <div className="text-sm uppercase tracking-[0.24em] text-muted">out of 5</div>
            </div>
            <p className="mt-4 text-lg leading-8 text-muted">{tool.verdict}</p>
          </section>

          <CommunityReviews
            reviews={reviews}
            average={reviewSummary.average || tool.rating.overall}
            breakdown={reviewSummary.percentages}
          />

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">FAQs</p>
            <FaqAccordion items={tool.faq} />
          </section>

          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Related Tools</p>
            <RelatedToolsRail tools={relatedTools} />
          </section>

          <section className="glass-card rounded-[28px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">More to explore</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href={`/categories/${tool.category}`} className="text-cyan hover:text-cyan/80">
                Browse more in {category?.name ?? formatCategoryName(tool.category)}
              </Link>
              <Link href={`/alternatives/${tool.id}`} className="text-cyan hover:text-cyan/80">
                Best alternatives to {tool.name}
              </Link>
              {alternatives.slice(0, 2).map((alternative) => (
                <Link key={alternative.id} href={`/compare/${tool.id}-vs-${alternative.id}`} className="text-cyan hover:text-cyan/80">
                  {tool.name} vs {alternative.name}
                </Link>
              ))}
              {tutorials.map((tutorial) => (
                <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="text-cyan hover:text-cyan/80">
                  Read tutorial: {tutorial.title}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-[calc(var(--header-height)+24px)]">
          <div className="glass-card rounded-[32px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Quick Info</p>
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-muted">Pricing</dt>
                <dd className="mt-1 font-semibold text-foreground">{tool.pricing.startingPrice}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-muted">Free plan</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {tool.pricing.hasFree ? tool.pricing.freeDetails : "No free plan"}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-muted">Platforms</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {tool.platforms.map((platform) => (
                    <Badge key={platform}>{platform}</Badge>
                  ))}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-muted">Last updated</dt>
                <dd className="mt-1 font-semibold text-foreground">{formatDate(tool.lastUpdated)}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <AffiliateDisclosure />
            </div>
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}
