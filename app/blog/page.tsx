import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { AiBriefPanel } from "@/components/news/AiBriefPanel";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read reviews, tutorials, comparisons, and news about the best AI tools for developers and creators.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = await getFeaturedPost();
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  const pulse = getNewsPulse();
  const latest = getLatestNews(4);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Reviews, tutorials, comparisons, and news</h1>
          <p className="mt-4 text-lg text-muted">
            Editorial content built to help you choose, learn, and get more out of the fast-moving AI ecosystem.
          </p>
        </div>

        {featured ? (
          <div className="glass-card floating-border mt-10 rounded-[36px] p-8 sm:p-10">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
                Featured post
              </div>
              <h2 className="mt-5 text-4xl font-extrabold text-foreground">{featured.title}</h2>
              <p className="mt-4 text-lg text-muted">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-muted">
                {formatDate(featured.date)} · {featured.readTime} · {featured.category}
              </p>
              <Link
                href={`/blog/${featured.slug}`}
                className="button-primary button-glow mt-6"
              >
                Read featured post
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          <AiBriefPanel pulse={pulse} items={latest} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
