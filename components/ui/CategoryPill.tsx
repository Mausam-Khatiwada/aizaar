import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function CategoryPill({
  active = false,
  children,
  className,
}: PropsWithChildren<{
  active?: boolean;
  className?: string;
}>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition",
        active
          ? "border-transparent bg-gradient-to-r from-purple to-cyan text-white shadow-purple"
          : "border-border bg-surface-soft text-muted hover:border-border-bright hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
