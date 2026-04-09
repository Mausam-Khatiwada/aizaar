import type { Tool } from "@/lib/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function RelatedToolsRail({ tools }: { tools: Tool[] }) {
  return (
    <div className="hide-scrollbar -mx-1 flex gap-4 overflow-x-auto pb-2 px-1 sm:mx-0 sm:gap-5 sm:px-0">
      {tools.map((tool) => (
        <div key={tool.id} className="w-[min(100%,300px)] shrink-0 sm:w-[320px] sm:max-w-[320px]">
          <ToolCard tool={tool} compact />
        </div>
      ))}
    </div>
  );
}
