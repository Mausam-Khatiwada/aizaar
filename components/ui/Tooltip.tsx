"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Tooltip({
  label,
  children,
}: PropsWithChildren<{
  label: string;
}>) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;

      const left = Math.min(window.innerWidth - 16, Math.max(16, rect.left + rect.width / 2));
      const top = Math.max(20, rect.top - 10);
      setCoords({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <span
      ref={anchorRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none fixed z-[95] rounded-xl border border-white/10 bg-surface-elevated px-3 py-1.5 text-xs text-foreground shadow-glass transition",
          open ? "opacity-100" : "opacity-0",
        )}
        role="tooltip"
        style={{
          top: coords.top,
          left: coords.left,
          transform: "translate(-50%, -100%)",
        }}
      >
        {label}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-white/10 bg-surface-elevated" />
      </span>
    </span>
  );
}
