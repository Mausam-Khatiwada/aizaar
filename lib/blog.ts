import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featured: boolean;
  readTime: string;
  author: string;
  slug: string;
};

export async function getAllPosts() {
  const files = fs.readdirSync(blogDirectory).filter((file) => file.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(blogDirectory, file), "utf8");
    const { data } = matter(raw);
    return {
      ...(data as Omit<BlogPostMeta, "slug">),
      slug: file.replace(/\.mdx$/, ""),
    };
  });

  return posts.sort((left, right) => right.date.localeCompare(left.date));
}

export async function getFeaturedPost() {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const compiled = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return {
    meta: {
      ...(data as Omit<BlogPostMeta, "slug">),
      slug,
    },
    content: compiled.content,
  };
}

export async function getAllPostSlugs() {
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
