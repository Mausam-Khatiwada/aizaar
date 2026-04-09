import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { ToolDirectoryShell } from "@/components/tools/ToolDirectoryShell";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { getAllCategories, getCategoryBySlug, getToolsForCategory } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} AI Tools`,
    description: category.description,
    alternates: {
      canonical: `/categories/${categorySlug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const tools = getToolsForCategory(categorySlug);
  const pulse = getNewsPulse();
  const latest = getLatestNews(3);

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: category.name,
            itemListElement: tools.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name,
              url: `/tools/${tool.id}`,
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Categories", item: "/categories" },
              { "@type": "ListItem", position: 3, name: category.name, item: `/categories/${category.id}` },
            ],
          },
        ]}
      />

      <section
        className="border-b border-white/10"
        style={{ backgroundImage: `${category.gradient}, linear-gradient(180deg, rgba(8,11,20,0.98), rgba(8,11,20,1))` }}
      >
        <div className="section-shell pt-14">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
              {category.toolCount} tools
            </p>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{category.name}</h1>
            <p className="mt-4 text-lg text-white/80">{category.heroCopy}</p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-shell text-muted">Loading category tools...</div>}>
        <ToolDirectoryShell
          tools={tools}
          categories={getAllCategories()}
          title={`Best ${formatCategoryName(categorySlug)} tools`}
          description={category.description}
          lockedCategory={categorySlug}
          aiBrief={{ pulse, items: latest }}
        />
      </Suspense>
    </PageTransition>
  );
}
