import Link from "next/link";
import { Flame } from "lucide-react";

import type { Tool } from "@/lib/tools";

export function TrendingTicker({ tools }: { tools: Tool[] }) {
  const items = [...tools, ...tools];

  return (
    <section className="ticker-shell border-b border-white/10 bg-white/[0.02]">
      <div className="overflow-hidden py-4">
        <div className="ticker-track gap-8 px-4">
          {items.map((tool, index) => (
            <Link
              key={`${tool.id}-${index}`}
              href={`/tools/${tool.id}`}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted transition hover:text-foreground"
            >
              <Flame size={14} className="text-amber" />
              Trending: {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}