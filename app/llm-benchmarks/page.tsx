import type { Metadata } from "next";

import { GlobalLlmComparison } from "@/components/home/GlobalLlmComparison";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/ui/PageTransition";
import { getLlmBenchmarks } from "@/lib/llmBenchmarks";

export const metadata: Metadata = {
  title: "Global LLM Benchmarks",
  description:
    "Compare top LLM models from around the world using actual Arena leaderboard data for text and code performance.",
  alternates: {
    canonical: "/llm-benchmarks",
  },
};

export default function LlmBenchmarksPage() {
  const benchmarks = getLlmBenchmarks();

  return (
    <PageTransition>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Global LLM Benchmarks",
          description:
            "Text and code leaderboard snapshot for top LLM models with score and vote data.",
          url: "/llm-benchmarks",
          creator: {
            "@type": "Organization",
            name: "aizaar",
          },
          measurementTechnique: "Arena leaderboard text and code preference scores",
          isBasedOn: benchmarks.source.url,
          dateModified: benchmarks.source.retrievedAt,
        }}
      />
      <GlobalLlmComparison data={benchmarks} />
    </PageTransition>
  );
}
