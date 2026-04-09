import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getToolBySlug } from "@/lib/tools";

const prebuiltPairs = [
  "midjourney-vs-dall-e-3",
  "cursor-vs-github-copilot",
  "elevenlabs-vs-murf-ai",
  "suno-vs-udio",
  "chatgpt-vs-claude",
  "runway-ml-vs-pika-labs",
];

function parsePair(slug: string) {
  const [left, right] = slug.split("-vs-");
  if (!left || !right) return null;
  return { left, right };
}

export function generateStaticParams() {
  return prebuiltPairs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = parsePair(slug);
  if (!pair) return {};

  const left = getToolBySlug(pair.left);
  const right = getToolBySlug(pair.right);
  if (!left || !right) return {};

  return {
    title: `${left.name} vs ${right.name} - Which is Better in 2026? Honest Comparison`,
    description: `Compare ${left.name} and ${right.name} across pricing, free plan, strengths, and who each tool is best for.`,
    alternates: {
      canonical: `/compare/${slug}`,
    },
  };
}

export default async function ComparePairPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = parsePair(slug);
  if (!pair) notFound();

  const left = getToolBySlug(pair.left);
  const right = getToolBySlug(pair.right);
  if (!left || !right) notFound();

  const recommendation = left.rating.overall >= right.rating.overall ? left : right;

  const faqItems = [
    {
      q: `Is ${left.name} better than ${right.name}?`,
      a: `${recommendation.name} currently edges ahead in overall rating, but your final choice should depend on workflow and budget.`,
    },
    {
      q: "Which one has a better free plan?",
      a: left.pricing.hasFree && !right.pricing.hasFree
        ? `${left.name} offers the stronger free access.`
        : right.pricing.hasFree && !left.pricing.hasFree
          ? `${right.name} offers the stronger free access.`
          : "Both are close on free access, so compare limits and outputs.",
    },
    {
      q: "Which is easier for beginners?",
      a: left.rating.easeOfUse >= right.rating.easeOfUse
        ? `${left.name} is slightly easier for first-time users.`
        : `${right.name} is slightly easier for first-time users.`,
    },
    {
      q: "Can I use both tools together?",
      a: "Yes. Many teams use one for ideation and another for production quality or scale.",
    },
    {
      q: "How often is this comparison updated?",
      a: "This page is refreshed regularly as plans, features, and quality benchmarks change.",
    },
  ];

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${left.name} vs ${right.name} - Which is Better in 2026? Honest Comparison`,
            description: `Comparison of ${left.name} and ${right.name}.`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
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
        <h1 className="max-w-4xl text-4xl font-extrabold sm:text-5xl">
          {left.name} vs {right.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          Honest comparison across pricing, free plan, strengths, ratings, and best-fit users.
        </p>

        <div className="table-scroll -mx-1 rounded-[28px] border border-white/10 px-1 sm:mx-0 sm:px-0">
          <table className="premium-table min-w-[480px] sm:min-w-[600px] md:min-w-[760px]">
            <thead>
              <tr>
                <th>Metric</th>
                <th>{left.name}</th>
                <th>{right.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-foreground">Price</td>
                <td>{left.pricing.startingPrice}</td>
                <td>{right.pricing.startingPrice}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Rating</td>
                <td className={left.rating.overall >= right.rating.overall ? "bg-emerald/10 text-foreground" : ""}>{left.rating.overall.toFixed(1)}</td>
                <td className={right.rating.overall >= left.rating.overall ? "bg-emerald/10 text-foreground" : ""}>{right.rating.overall.toFixed(1)}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Free Plan</td>
                <td>{left.pricing.hasFree ? "Yes" : "No"}</td>
                <td>{right.pricing.hasFree ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Best Feature</td>
                <td>{left.highlights[0]?.title ?? left.tags[0]}</td>
                <td>{right.highlights[0]?.title ?? right.tags[0]}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Best For</td>
                <td>{left.bestFor}</td>
                <td>{right.bestFor}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="glass-card rounded-[28px] p-6">
            <h2 className="text-2xl font-extrabold text-foreground">{left.name} Pros and Cons</h2>
            <p className="mt-3 text-sm text-muted">Pros: {left.pros.slice(0, 2).join(", ")}</p>
            <p className="mt-2 text-sm text-muted">Cons: {left.cons.slice(0, 2).join(", ")}</p>
          </div>
          <div className="glass-card rounded-[28px] p-6">
            <h2 className="text-2xl font-extrabold text-foreground">{right.name} Pros and Cons</h2>
            <p className="mt-3 text-sm text-muted">Pros: {right.pros.slice(0, 2).join(", ")}</p>
            <p className="mt-2 text-sm text-muted">Cons: {right.cons.slice(0, 2).join(", ")}</p>
          </div>
        </div>

        <div className="glass-card mt-8 rounded-[30px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Which should you choose?</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground">Our recommendation: {recommendation.name}</h2>
          <p className="mt-3 text-muted">
            Pick {recommendation.name} if you want the strongest overall balance right now. Choose the alternative if its pricing model or workflow fit better matches your team.
          </p>
          <Link href={`/tools/${recommendation.id}`} className="button-primary button-glow mt-5 inline-flex">
            Try {recommendation.name}
          </Link>
        </div>

        <div className="mt-10 grid gap-4">
          <h2 className="text-3xl font-extrabold text-foreground">FAQ</h2>
          {faqItems.map((item) => (
            <div key={item.q} className="glass-card rounded-[20px] p-5">
              <h3 className="text-lg font-bold text-foreground">{item.q}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
