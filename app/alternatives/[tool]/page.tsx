import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getRelatedTools, getToolBySlug } from "@/lib/tools";

const prebuilt = ["midjourney", "chatgpt", "cursor", "elevenlabs"];

export function generateStaticParams() {
  return prebuilt.map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const current = getToolBySlug(tool);
  if (!current) return {};

  return {
    title: `Best ${current.name} Alternatives in 2026`,
    description: `Explore better alternatives to ${current.name} by pricing, workflow fit, and feature strengths.`,
    alternates: {
      canonical: `/alternatives/${tool}`,
    },
  };
}

export default async function AlternativesPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const baseTool = getToolBySlug(tool);
  if (!baseTool) notFound();

  const alternatives = getRelatedTools(baseTool, 8).filter((item) => item.id !== baseTool.id).slice(0, 8);
  const faq = [
    {
      q: `Why look for ${baseTool.name} alternatives?`,
      a: "Teams usually switch for pricing, better quality in one workflow, or stronger free plans.",
    },
    {
      q: "How should I pick the right alternative?",
      a: "Choose based on your top job-to-be-done, budget limits, and integration requirements.",
    },
    {
      q: "Should I migrate everything immediately?",
      a: "No. Test two alternatives in parallel with one real project before switching fully.",
    },
    {
      q: "Are free alternatives good enough?",
      a: "For many users yes, but paid tiers usually unlock better limits and export quality.",
    },
    {
      q: "How often is this list updated?",
      a: "The list is reviewed regularly as tool quality, features, and pricing evolve.",
    },
  ];

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Best ${baseTool.name} Alternatives in 2026`,
            description: `Alternatives to ${baseTool.name}.`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          },
        ]}
      />

      <section className="section-shell pt-14">
        <h1 className="max-w-4xl text-4xl font-extrabold sm:text-5xl">Best {baseTool.name} Alternatives in 2026</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          If {baseTool.name} is not fitting your budget or workflow, these alternatives are worth testing next.
        </p>

        <div className="glass-card mt-8 rounded-[30px] p-6">
          <h2 className="text-2xl font-extrabold text-foreground">Why you might want an alternative</h2>
          <p className="mt-3 text-muted">
            Common reasons include pricing pressure, feature mismatch for your use case, or better output quality from newer competitors.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {alternatives.map((item) => (
            <article key={item.id} className="glass-card rounded-[24px] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-foreground">{item.name}</h2>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
                  {item.rating.overall.toFixed(1)}★
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.tagline}</p>
              <div className="mt-3 text-sm text-muted">Starts at {item.pricing.startingPrice}</div>
              <Link href={`/compare/${baseTool.id}-vs-${item.id}`} className="mt-4 inline-flex text-sm font-semibold text-cyan">
                Compare with {baseTool.name}
              </Link>
            </article>
          ))}
        </div>

        <div className="glass-card mt-8 rounded-[30px] p-6">
          <h2 className="text-2xl font-extrabold text-foreground">Recommendation by use case</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Choose the highest-rated option for general reliability. Pick cheaper alternatives for experimentation, and pick workflow-specific tools when output style matters more than broad features.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          <h2 className="text-3xl font-extrabold text-foreground">FAQ</h2>
          {faq.map((item) => (
            <article key={item.q} className="glass-card rounded-[20px] p-5">
              <h3 className="text-lg font-bold text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
