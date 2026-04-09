import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { getAllTutorialSlugs, getAllTutorials, getTutorialBySlug } from "@/lib/tutorials";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { getLatestNews } from "@/lib/news";

export async function generateStaticParams() {
  const slugs = await getAllTutorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) return {};

  return {
    title: tutorial.meta.title,
    description: tutorial.meta.excerpt,
    alternates: {
      canonical: `/tutorials/${slug}`,
    },
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) notFound();
  const relatedTutorials = (await getAllTutorials()).filter((item) => item.slug !== slug).slice(0, 3);
  const latestNews = getLatestNews(3);
  const faqItems = [
    { q: `Who should read this ${tutorial.meta.title} guide?`, a: "This guide is written for creators, developers, and freelancers who want practical implementation steps." },
    { q: "Do I need a paid plan?", a: "Most workflows can be tested on free tiers, but paid plans unlock scale and export quality." },
    { q: "How long does setup take?", a: "Most readers can complete first setup in under one hour." },
    { q: "Can I use this for client work?", a: "Yes, but confirm tool licensing and client policy requirements before publishing." },
    { q: "How often is this tutorial updated?", a: "Tutorials are reviewed periodically as product interfaces and feature sets evolve." },
  ];

  return (
    <PageTransition>
      <ReadingProgressBar />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: tutorial.meta.title,
            description: tutorial.meta.excerpt,
            datePublished: tutorial.meta.date,
            author: {
              "@type": "Person",
              name: tutorial.meta.author,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: tutorial.meta.title,
            description: tutorial.meta.excerpt,
            step: [
              { "@type": "HowToStep", name: "Set up your tool account" },
              { "@type": "HowToStep", name: "Run your first working prompt or project" },
              { "@type": "HowToStep", name: "Optimize output with advanced tips" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          },
        ]}
      />

      <article className="section-shell pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">{tutorial.meta.category}</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{tutorial.meta.title}</h1>
          <p className="mt-4 text-lg text-muted">{tutorial.meta.excerpt}</p>
          <p className="mt-4 text-sm text-muted">
            {formatDate(tutorial.meta.date)} | {tutorial.meta.readTime} | {tutorial.meta.author}
          </p>
        </div>

        <div className="prose prose-invert mx-auto mt-10 max-w-3xl rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          {tutorial.content}
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-5">
          <section className="glass-card rounded-[24px] p-5">
            <h2 className="text-2xl font-extrabold text-foreground">Related tutorials</h2>
            <div className="mt-3 grid gap-2 text-sm">
              {relatedTutorials.map((item) => (
                <Link key={item.slug} href={`/tutorials/${item.slug}`} className="text-cyan hover:text-cyan/80">
                  {item.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[24px] p-5">
            <h2 className="text-2xl font-extrabold text-foreground">Relevant AI news</h2>
            <div className="mt-3 grid gap-2 text-sm">
              {latestNews.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`} className="text-cyan hover:text-cyan/80">
                  {item.headline}
                </Link>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-[24px] p-5">
            <h2 className="text-2xl font-extrabold text-foreground">FAQ</h2>
            <div className="mt-3 grid gap-3">
              {faqItems.map((item) => (
                <article key={item.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-1 text-sm text-muted">{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageTransition>
  );
}
