import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
