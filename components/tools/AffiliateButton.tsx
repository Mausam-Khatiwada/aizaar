import type { PropsWithChildren } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function AffiliateButton({
  href,
  children,
  className,
}: PropsWithChildren<{
  href: string;
  className?: string;
}>) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="nofollow noopener sponsored"
      className={cn(
        "button-primary button-glow whitespace-nowrap",
        className,
      )}
    >
      {children}
    </Link>
  );
}
