"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

const placeholders = [
  "Search Midjourney...",
  "Search Cursor AI...",
  "Search ElevenLabs...",
  "Search Suno...",
];

export function ToolSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [activePlaceholder, setActivePlaceholder] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const placeholderText = useMemo(() => placeholders[activePlaceholder] ?? placeholders[0], [activePlaceholder]);

  useEffect(() => {
    const typing = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= placeholderText.length) {
          return current;
        }
        return current + 1;
      });
    }, 44);

    const rotate = window.setInterval(() => {
      setActivePlaceholder((current) => (current + 1) % placeholders.length);
      setTypedLength(0);
    }, 3000);

    return () => {
      window.clearInterval(typing);
      window.clearInterval(rotate);
    };
  }, [placeholderText.length]);

  return (
    <label className="glass-card mx-auto flex min-h-14 w-full max-w-[600px] items-center gap-3 rounded-full px-4 sm:px-5">
      <Search size={20} className="text-transparent" style={{ backgroundImage: "linear-gradient(130deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text" }} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={value ? "Search tools..." : placeholderText.slice(0, typedLength)}
        className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
      />
      <span className="hidden h-7 items-center rounded-full border border-white/10 px-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:inline-flex">
        Cmd K
      </span>
    </label>
  );
}
