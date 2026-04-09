import benchmarksData from "@/data/llmBenchmarks.json";

export type LlmBenchmarkRow = (typeof benchmarksData)["textLeaderboard"][number];
export type LlmBenchmarks = typeof benchmarksData;

export function getLlmBenchmarks(): LlmBenchmarks {
  return benchmarksData;
}

export function getCountryCoverage() {
  const counts = new Map<string, number>();
  const combined = [...benchmarksData.textLeaderboard, ...benchmarksData.codeLeaderboard];
  for (const row of combined) {
    counts.set(row.country, (counts.get(row.country) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([country, models]) => ({ country, models }))
    .sort((left, right) => right.models - left.models);
}
