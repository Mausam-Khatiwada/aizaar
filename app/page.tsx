import type { Metadata } from "next";

import { AiOfWeek } from "@/components/home/AiOfWeek";
import { AdvancedPlaybooks } from "@/components/home/AdvancedPlaybooks";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComparisonCta } from "@/components/home/ComparisonCta";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { GlobalLlmComparison } from "@/components/home/GlobalLlmComparison";
import { Hero } from "@/components/home/Hero";
import { IntelligenceBrief } from "@/components/home/IntelligenceBrief";
import { LatestNewsRow } from "@/components/home/LatestNewsRow";
import { LaunchRadar } from "@/components/home/LaunchRadar";
import { Newsletter } from "@/components/home/Newsletter";
import { QuickComparisonWidget } from "@/components/home/QuickComparisonWidget";
import { StatsBar } from "@/components/home/StatsBar";
import { TrustBar } from "@/components/home/TrustBar";
import { TrendingTicker } from "@/components/home/TrendingTicker";
import { TrendingTools } from "@/components/home/TrendingTools";
import { UseCasePills } from "@/components/home/UseCasePills";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageTransition } from "@/components/ui/PageTransition";
import {
  getAllCategories,
  getAllTools,
  getFeaturedTools,
  getNewestTools,
  getRecentlyUpdatedTools,
  getToolBySlug,
  getTickerTools,
  getTrendingTools,
} from "@/lib/tools";
import { getLatestNews, getLatestToolNews, getNewsPulse } from "@/lib/news";
import { siteConfig } from "@/lib/site";
import { getAllTutorials } from "@/lib/tutorials";
import { getLlmBenchmarks } from "@/lib/llmBenchmarks";

export const metadata: Metadata = {
  title: "Discover the Best AI Tools for Every Task",
  description:
    "Explore 130+ reviewed AI tools across 15 categories. Compare pricing, features, ratings, and save the best tools for your workflow.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const allTools = getAllTools();
  const categories = getAllCategories();
  const featuredTools = getFeaturedTools();
  const trendingTools = getTrendingTools();
  const newestTools = getNewestTools();
  const tickerTools = getTickerTools();
  const spotlightTool = getToolBySlug("cursor") ?? featuredTools[0];
  const latestNews = getLatestNews(4);
  const intelligenceNews = getLatestNews(8);
  const launchRadar = getLatestToolNews(6);
  const recentlyUpdatedTools = getRecentlyUpdatedTools(8);
  const pulse = getNewsPulse();
  const tutorials = await getAllTutorials();
  const llmBenchmarks = getLlmBenchmarks();
  const categoryPreviewMap = categories.reduce<Record<string, Array<{ id: string; name: string; logo: string }>>>(
    (acc, category) => {
      acc[category.id] = allTools
        .filter((tool) => tool.category === category.id || tool.secondaryCategories.includes(category.id))
        .slice(0, 3)
        .map((tool) => ({ id: tool.id, name: tool.name, logo: tool.logo }));
      return acc;
    },
    {},
  );

  return (
    <PageTransition>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          },
        ]}
      />

      <Hero />
      <TrustBar />
      <TrendingTicker tools={tickerTools} />
      <StatsBar />
      <CategoryGrid categories={categories} previewMap={categoryPreviewMap} />
      <FeaturedTools tools={featuredTools} />
      <TrendingTools tools={trendingTools} />
      {spotlightTool ? <AiOfWeek tool={spotlightTool} /> : null}
      <LatestNewsRow items={latestNews} />
      <LaunchRadar items={launchRadar} />
      <IntelligenceBrief
        news={intelligenceNews}
        tools={recentlyUpdatedTools}
        stats={{
          weeklyUpdates: pulse.weeklyUpdates,
          monthlyLaunches: pulse.monthlyLaunches,
          activeTools: allTools.length,
        }}
      />
      <GlobalLlmComparison data={llmBenchmarks} />
      <AdvancedPlaybooks tutorials={tutorials} />
      <UseCasePills />
      <QuickComparisonWidget tools={allTools} />
      <ComparisonCta />

      <section className="section-shell pt-0">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Just Added</p>
          <h2 className="section-title">Fresh additions worth checking before everyone else does</h2>
        </div>
        <ToolGrid tools={newestTools} compact />
      </section>

      <Newsletter />
    </PageTransition>
  );
}
