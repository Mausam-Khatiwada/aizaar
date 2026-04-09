import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";

import type { Tool } from "@/lib/tools";

export const toolFuseOptions: IFuseOptions<Tool> = {
  threshold: 0.32,
  includeScore: true,
  keys: [
    { name: "name", weight: 0.5 },
    { name: "tagline", weight: 0.2 },
    { name: "category", weight: 0.1 },
    { name: "subcategory", weight: 0.1 },
    { name: "tags", weight: 0.1 },
  ],
};

export function createToolSearch(tools: Tool[]) {
  return new Fuse(tools, toolFuseOptions);
}

export function searchTools(tools: Tool[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return tools.slice(0, 8);
  return createToolSearch(tools)
    .search(trimmed)
    .map((result) => result.item)
    .slice(0, 12);
}
