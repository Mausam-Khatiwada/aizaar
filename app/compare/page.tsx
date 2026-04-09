import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { Badge } from "@/components/ui/Badge";
import { AiBriefPanel } from "@/components/news/AiBriefPanel";
import { getLatestNews, getNewsPulse } from "@/lib/news";
import { getComparisonWinner, getToolsBySlugs, type Tool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Compare AI Tools",
  description:
    "Compare AI tools side by side across pricing, ratings, features, platforms, and pros and cons.",
  alternates: {
    canonical: "/compare",
  },
};

const rows = [
  { label: "Starting price", metric: "price" as const, render: (tool: Tool) => tool.pricing.startingPrice },
  { label: "Overall rating", metric: "rating" as const, render: (tool: Tool) => tool.rating.overall.toFixed(1) },
  { label: "Ease of use", metric: "easeOfUse" as const, render: (tool: Tool) => tool.rating.easeOfUse.toFixed(1) },
  { label: "Features", metric: "features" as const, render: (tool: Tool) => tool.rating.features.toFixed(1) },
  { label: "Value for money", metric: "valueForMoney" as const, render: (tool: Tool) => tool.rating.valueForMoney.toFixed(1) },
  { label: "Support", metric: "support" as const, render: (tool: Tool) => tool.rating.support.toFixed(1) },
  { label: "Best for", metric: "pros" as const, render: (tool: Tool) => tool.bestFor },
  { label: "Platforms", metric: "platforms" as const, render: (tool: Tool) => tool.platforms.join(", ") },
  { label: "Pros", metric: "pros" as const, render: (tool: Tool) => tool.pros.slice(0, 2).join(" · ") },
  { label: "Cons", metric: "pros" as const, render: (tool: Tool) => tool.cons.slice(0, 2).join(" · ") },
];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slugParam = typeof params.tools === "string" ? params.tools : "";
  const slugs = slugParam.split(",").filter(Boolean).slice(0, 3);
  const tools = getToolsBySlugs(slugs);
  const winner = getComparisonWinner(tools, "rating");
  const pulse = getNewsPulse();
  const latest = getLatestNews(4);

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Compare", item: "/compare" },
          ],
        }}
      />

      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Compare AI tools side by side</h1>
          <p className="mt-4 text-lg text-muted">
            See where each tool wins on pricing, usability, features, and platform coverage.
          </p>
        </div>

        <div className="mt-8">
          <AiBriefPanel
            pulse={pulse}
            items={latest}
            title="Latest AI context"
            description="A quick snapshot of what changed this week, so your comparison is based on what’s happening now."
          />
        </div>

        {tools.length >= 2 ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.id} className="glass-card min-w-0 rounded-[30px] p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-foreground">{tool.name}</h2>
                      <p className="mt-2 text-sm leading-7 text-muted">{tool.tagline}</p>
                    </div>
                    {winner?.id === tool.id ? (
                      <Badge className="shrink-0 border-emerald/30 bg-emerald/10 text-emerald">Winner</Badge>
                    ) : null}
                  </div>
                  <div className="mt-6 grid gap-3 text-sm text-muted">
                    <div>Rating: <span className="font-semibold text-foreground">{tool.rating.overall.toFixed(1)}</span></div>
                    <div>Pricing: <span className="font-semibold text-foreground">{tool.pricing.startingPrice}</span></div>
                    <div>Best for: <span className="font-semibold text-foreground">{tool.bestFor}</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="table-scroll -mx-1 px-1 sm:mx-0 sm:px-0">
              <table className="premium-table min-w-[520px] sm:min-w-[680px] md:min-w-[860px]">
                <thead>
                  <tr>
                    <th className="text-muted">Metric</th>
                    {tools.map((tool) => (
                      <th key={tool.id} className="text-foreground">{tool.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const rowWinner = getComparisonWinner(tools, row.metric);
                    return (
                      <tr key={row.label}>
                        <td className="font-semibold text-foreground">{row.label}</td>
                        {tools.map((tool) => (
                          <td
                            key={`${row.label}-${tool.id}`}
                            className={rowWinner?.id === tool.id ? "bg-emerald/10 text-foreground" : "text-muted"}
                          >
                            {row.render(tool)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {winner ? (
              <div className="mt-8 glass-card rounded-[32px] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Recommended next step</p>
                <h2 className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">{winner.name} comes out ahead overall</h2>
                <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">
                  It delivers the strongest overall balance of rating, workflow fit, and feature depth across this comparison.
                </p>
                <Link
                  href={winner.hasAffiliate ? winner.affiliateUrl : winner.website}
                  target="_blank"
                  rel="nofollow noopener sponsored"
                  className="button-primary button-glow mt-6 inline-flex w-full justify-center sm:w-auto"
                >
                  Try {winner.name}
                </Link>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mt-10 glass-card rounded-[32px] p-10 text-center">
            <h2 className="text-3xl font-extrabold text-foreground">Pick at least two tools to compare</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Use the compare buttons across the site to add up to three tools, then come back here for a side-by-side breakdown.
            </p>
            <Link
              href="/tools"
              className="button-primary button-glow mt-6"
            >
              Browse tools
            </Link>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
