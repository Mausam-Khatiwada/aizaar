import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageTransition>
      <ReadingProgressBar />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.meta.title,
          description: post.meta.excerpt,
          datePublished: post.meta.date,
          author: {
            "@type": "Person",
            name: post.meta.author,
          },
        }}
      />

      <article className="section-shell pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">{post.meta.category}</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{post.meta.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.meta.excerpt}</p>
          <p className="mt-4 text-sm text-muted">
            {formatDate(post.meta.date)} · {post.meta.readTime} · {post.meta.author}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.03] p-5 prose prose-sm prose-invert max-w-none sm:p-8 sm:prose-base">
          {post.content}
        </div>
      </article>
    </PageTransition>
  );
}
