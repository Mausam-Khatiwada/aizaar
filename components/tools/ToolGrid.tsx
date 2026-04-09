import type { Tool } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function ToolGrid({
  tools,
  compact = false,
}: {
  tools: Tool[];
  compact?: boolean;
}) {
  return (
    <div className="grid w-full min-w-0 max-w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} compact={compact} />
      ))}
    </div>
  );
}
