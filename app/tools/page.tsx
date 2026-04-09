import type { Metadata } from "next";
import { Suspense } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { ToolDirectoryShell } from "@/components/tools/ToolDirectoryShell";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { getAllCategories, getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All AI Tools",
  description:
    "Browse the complete AI tools directory with fuzzy search, live filters, pricing badges, and direct comparisons.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getAllCategories();
  const pulse = getNewsPulse();
  const latest = getLatestNews(3);

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All AI Tools",
          description: "A directory of AI tools with filters, ratings, and comparisons.",
        }}
      />
      <Suspense fallback={<div className="section-shell pt-14 text-muted">Loading directory...</div>}>
        <ToolDirectoryShell
          tools={tools}
          categories={categories}
          title="All AI Tools"
          description="Search, filter, and compare every tool in the directory without leaving the page."
          aiBrief={{ pulse, items: latest }}
        />
      </Suspense>
    </PageTransition>
  );
}
