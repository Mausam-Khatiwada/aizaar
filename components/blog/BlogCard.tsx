import Link from "next/link";

import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-card group flex h-full flex-col rounded-[30px] p-6 transition hover:-translate-y-1 hover:border-white/15"
    >
      <div className="inline-flex w-fit rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
        {post.category}
      </div>
      <h2 className="mt-5 text-2xl font-bold text-foreground transition group-hover:text-cyan">
        {post.title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>
      <div className="mt-auto pt-6 text-sm text-muted">
        {formatDate(post.date)} · {post.readTime}
      </div>
    </Link>
  );
}
