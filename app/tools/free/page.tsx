import type { Metadata } from "next";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageTransition } from "@/components/ui/PageTransition";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Free AI Tools (No Credit Card)",
  description: "Browse AI tools that offer free plans so you can test workflows before paying.",
  alternates: {
    canonical: "/tools/free",
  },
};

export default function FreeToolsPage() {
  const tools = getAllTools().filter((tool) => tool.pricing.hasFree);

  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">All Free AI Tools (No Credit Card)</h1>
          <p className="mt-4 text-lg text-muted">Explore tools with free access so you can validate your workflow before upgrading.</p>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </PageTransition>
  );
}
