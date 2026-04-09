import type { Metadata } from "next";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Highest Rated AI Tools",
  description: "Browse the top-rated AI tools based on overall score and review sentiment.",
  alternates: {
    canonical: "/tools/best-rated",
  },
};

export default function BestRatedToolsPage() {
  const tools = getAllTools()
    .slice()
    .sort((left, right) => right.rating.overall - left.rating.overall)
    .slice(0, 60);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Highest Rated AI Tools</h1>
          <p className="mt-4 text-lg text-muted">A leaderboard of AI products that consistently score high in real usage.</p>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </PageTransition>
  );
}
