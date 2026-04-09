import type { Tool } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function TrendingTools({ tools }: { tools: Tool[] }) {
  return (
    <section className="section-shell pt-0">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-amber">Trending</p>
        <h2 className="section-title">Everyone&apos;s using these right now</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tools.slice(0, 8).map((tool, index) => (
          <div key={tool.id} className="relative min-w-0">
            <span className="pointer-events-none absolute left-2 top-1 text-4xl font-black tracking-tight text-white/5 sm:left-3 sm:top-2 sm:text-6xl">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <div className="relative">
              <ToolCard tool={tool} compact />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
