"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Search } from "lucide-react";

import { ToolGrid } from "@/components/tools/ToolGrid";
import { getTrendingTools } from "@/lib/tools";

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const popularTools = getTrendingTools().slice(0, 4);

  return (
    <section className="section-shell pt-20">
      <div className="text-center">
        <h1 className="gradient-text text-7xl font-black sm:text-8xl">404</h1>
        <p className="mt-3 text-2xl font-bold text-foreground">This tool seems to have escaped</p>
        <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-soft">
          <Bot size={26} className="text-cyan" />
        </div>
      </div>

      <form
        className="mx-auto mt-8 max-w-2xl rounded-full border border-border bg-surface-soft px-5 py-3"
        onSubmit={(event) => {
          event.preventDefault();
          router.push(`/tools${query ? `?q=${encodeURIComponent(query)}` : ""}`);
        }}
      >
        <label className="flex items-center gap-3">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search popular tools..."
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </label>
      </form>

      <div className="mt-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Popular tools</p>
        <ToolGrid tools={popularTools} compact />
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="button-primary button-glow">
          Go Home
        </Link>
      </div>
    </section>
  );
}
