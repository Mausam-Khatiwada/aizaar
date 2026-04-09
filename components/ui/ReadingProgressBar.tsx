"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      setProgress(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="sticky top-[var(--header-height)] z-40 h-[3px] w-full bg-transparent">
      <div className="h-full bg-gradient-to-r from-purple via-cyan to-emerald transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}
