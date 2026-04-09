import { cn } from "@/lib/utils";

import type { Tool } from "@/lib/tools";

const pricingClasses: Record<Tool["pricing"]["model"], string> = {
  free: "border-emerald/30 bg-emerald/10 text-emerald",
  freemium: "border-amber/30 bg-amber/10 text-amber",
  paid: "border-rose/30 bg-rose/10 text-rose-300",
};

export function PricingBadge({ model }: { model: Tool["pricing"]["model"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        pricingClasses[model],
      )}
    >
      {model}
    </span>
  );
}
