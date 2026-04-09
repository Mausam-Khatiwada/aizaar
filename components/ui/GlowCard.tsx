import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "glass-card w-full min-w-0 max-w-full rounded-[28px] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/15 hover:shadow-purple",
        className,
      )}
    >
      {children}
    </div>
  );
}
