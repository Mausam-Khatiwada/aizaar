import type { Metadata } from "next";

import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AiBriefPanel } from "@/components/news/AiBriefPanel";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { getAllCategories, getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Browse Categories",
  description:
    "Explore all 15 AI tool categories, from image generation and coding assistants to research and SEO platforms.",
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesIndexPage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const pulse = getNewsPulse();
  const latest = getLatestNews(4);
  const categoryPreviewMap = categories.reduce<Record<string, Array<{ id: string; name: string; logo: string }>>>(
    (acc, category) => {
      acc[category.id] = tools
        .filter((tool) => tool.category === category.id || tool.secondaryCategories.includes(category.id))
        .slice(0, 3)
        .map((tool) => ({ id: tool.id, name: tool.name, logo: tool.logo }));
      return acc;
    },
    {},
  );

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Explore by category</h1>
          <p className="mt-4 text-lg text-muted">
            Jump into the workflow you care about and discover the strongest AI products inside it.
          </p>
        </div>
      </section>
      <section className="section-shell pt-0">
        <AiBriefPanel
          pulse={pulse}
          items={latest}
          title="Latest AI moves"
          description="Quick context before you dive into a category: what launched, what updated, and where funding is flowing."
        />
      </section>
      <CategoryGrid categories={categories} previewMap={categoryPreviewMap} />
    </PageTransition>
  );
}
