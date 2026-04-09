import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const tutorialsDirectory = path.join(process.cwd(), "content", "tutorials");

export type TutorialDifficulty = "beginner" | "intermediate" | "advanced";

export type TutorialMeta = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  difficulty: TutorialDifficulty;
  featured?: boolean;
  slug: string;
};

export async function getAllTutorials() {
  if (!fs.existsSync(tutorialsDirectory)) return [];
  const files = fs.readdirSync(tutorialsDirectory).filter((file) => file.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(tutorialsDirectory, file), "utf8");
    const { data } = matter(raw);
    return {
      ...(data as Omit<TutorialMeta, "slug">),
      slug: file.replace(/\.mdx$/, ""),
    };
  });
  return posts.sort((left, right) => right.date.localeCompare(left.date));
}

export async function getTutorialBySlug(slug: string) {
  const filePath = path.join(tutorialsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

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
      ...(data as Omit<TutorialMeta, "slug">),
      slug,
    },
    content: compiled.content,
  };
}

export async function getAllTutorialSlugs() {
  if (!fs.existsSync(tutorialsDirectory)) return [];
  return fs
    .readdirSync(tutorialsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
