import type { MetadataRoute } from "next";

import { getAllCategories, getAllTools } from "@/lib/tools";
import { getAllPostSlugs } from "@/lib/blog";
import { getAllTutorialSlugs } from "@/lib/tutorials";
import { getAllNews } from "@/lib/news";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tools = getAllTools();
  const categories = getAllCategories();
  const posts = await getAllPostSlugs();
  const tutorials = await getAllTutorialSlugs();
  const newsItems = getAllNews();
  const comparePairs = [
    "midjourney-vs-dall-e-3",
    "cursor-vs-github-copilot",
    "elevenlabs-vs-murf-ai",
    "suno-vs-udio",
    "chatgpt-vs-claude",
    "runway-ml-vs-pika-labs",
  ];
  const alternatives = ["midjourney", "chatgpt", "cursor", "elevenlabs"];

  const staticRoutes = [
    "",
    "/tools",
    "/tools/free",
    "/tools/new",
    "/tools/trending",
    "/tools/best-rated",
    "/categories",
    "/compare",
    "/blog",
    "/tutorials",
    "/news",
    "/insights",
    "/llm-benchmarks",
    "/saved",
    "/submit-a-tool",
    "/about",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.id}`,
      lastModified: new Date(tool.lastUpdated),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/categories/${category.id}`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((slug) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: new Date("2026-04-06"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...tutorials.map((slug) => ({
      url: `${siteConfig.url}/tutorials/${slug}`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...newsItems.map((item) => ({
      url: `${siteConfig.url}/news/${item.id}`,
      lastModified: new Date(item.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.66,
    })),
    ...comparePairs.map((slug) => ({
      url: `${siteConfig.url}/compare/${slug}`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "weekly" as const,
      priority: 0.64,
    })),
    ...alternatives.map((slug) => ({
      url: `${siteConfig.url}/alternatives/${slug}`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "weekly" as const,
      priority: 0.62,
    })),
  ];
}
