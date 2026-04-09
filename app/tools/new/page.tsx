import type { Metadata } from "next";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Newest AI Tools Added This Month",
  description: "Discover the latest AI tools added to aizaar this month.",
  alternates: {
    canonical: "/tools/new",
  },
};

export default function NewToolsPage() {
  const tools = getAllTools()
    .slice()
    .sort((left, right) => right.lastUpdated.localeCompare(left.lastUpdated))
    .slice(0, 36);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Newest AI Tools Added This Month</h1>
          <p className="mt-4 text-lg text-muted">Fresh additions and recent updates, curated weekly.</p>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </PageTransition>
  );
}
