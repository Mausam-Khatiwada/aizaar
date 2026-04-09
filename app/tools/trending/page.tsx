import type { Metadata } from "next";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Trending AI Tools This Week",
  description: "See which AI tools are getting the most attention and usage this week.",
  alternates: {
    canonical: "/tools/trending",
  },
};

export default function TrendingToolsPage() {
  const tools = getAllTools()
    .filter((tool) => tool.trending)
    .sort((left, right) => right.rating.overall - left.rating.overall);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Trending AI Tools This Week</h1>
          <p className="mt-4 text-lg text-muted">The tools builders, creators, and freelancers are actively switching to right now.</p>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </PageTransition>
  );
}
