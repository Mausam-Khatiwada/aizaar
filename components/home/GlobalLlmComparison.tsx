import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { LlmBenchmarks } from "@/lib/llmBenchmarks";
import { getCountryCoverage } from "@/lib/llmBenchmarks";

export function GlobalLlmComparison({ data }: { data: LlmBenchmarks }) {
  const coverage = getCountryCoverage();

  return (
    <section className="section-shell min-w-0 pt-0">
      <div className="mb-7 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Global LLM Comparison</p>
          <h2 className="section-title">Actual benchmark snapshot from worldwide model leaders</h2>
          <p className="section-copy mt-3 max-w-3xl">
            Source: {data.source.name} ({data.source.retrievedAt}). Scores and vote counts are directly mapped from the
            published Text and Code snapshots.
          </p>
        </div>
        <Link href="/llm-benchmarks" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          Full LLM board
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {coverage.map((item) => (
          <span key={item.country} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            {item.country}: {item.models} models
          </span>
        ))}
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-2">
        <div className="glass-card max-w-full min-w-0 overflow-hidden rounded-[26px] p-4 sm:p-5">
          <h3 className="text-lg font-bold text-foreground sm:text-xl">Arena Text Leaderboard (Top 10)</h3>
          <p className="mt-1 text-xs text-muted">Human preference score with vote volume from Arena.</p>
          <BenchmarkTable rows={data.textLeaderboard} />
        </div>
        <div className="glass-card max-w-full min-w-0 overflow-hidden rounded-[26px] p-4 sm:p-5">
          <h3 className="text-lg font-bold text-foreground sm:text-xl">Arena Code Leaderboard (Top 10)</h3>
          <p className="mt-1 text-xs text-muted">Coding benchmark preference snapshot from Arena.</p>
          <BenchmarkTable rows={data.codeLeaderboard} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
        Methodology note: this section uses one source for consistency and comparability.{" "}
        <Link href={data.source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan hover:text-cyan/80">
          Open source leaderboard
        </Link>
        .
      </div>
    </section>
  );
}

function BenchmarkTable({ rows }: { rows: LlmBenchmarks["textLeaderboard"] }) {
  return (
    <div className="table-scroll hide-scrollbar mt-4">
      <table className="premium-table w-full min-w-[520px] text-xs sm:min-w-[600px] sm:text-sm md:min-w-[660px] lg:min-w-full [&_td]:px-2.5 [&_td]:py-2.5 [&_th]:px-2.5 [&_th]:py-2.5 sm:[&_td]:px-4 sm:[&_td]:py-4 sm:[&_th]:px-4 sm:[&_th]:py-4">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Model</th>
            <th>Provider</th>
            <th>Country</th>
            <th>Score</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.rank}-${row.model}`}>
              <td className="font-semibold text-foreground">#{row.rank}</td>
              <td className="max-w-[min(14rem,52vw)] break-words font-semibold text-foreground sm:max-w-[320px]">
                {row.model}
              </td>
              <td className="whitespace-nowrap">{row.provider}</td>
              <td className="whitespace-nowrap">{row.country}</td>
              <td className="font-semibold text-foreground">{row.score}</td>
              <td className="whitespace-nowrap">{row.votes.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
