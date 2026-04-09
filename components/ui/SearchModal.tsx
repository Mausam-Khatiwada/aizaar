"use client";

import { useDeferredValue, useEffect, useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock3, Flame, Search, Sparkles, X } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { createToolSearch } from "@/lib/search";
import { formatCategoryName } from "@/lib/utils";

const RECENT_KEY = "toolverse-recent-searches";

export function SearchModal() {
  const router = useRouter();
  const { tools, searchOpen, closeSearch } = useAppShell();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);
  const categories = useMemo(
    () =>
      Array.from(
        new Map(tools.map((tool) => [tool.category, { id: tool.category, name: formatCategoryName(tool.category) }])).values(),
      ),
    [tools],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(RECENT_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored) as string[]);
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [searchOpen]);

  const fuse = useMemo(() => createToolSearch(tools), [tools]);
  const results = useMemo(() => {
    if (!deferredQuery.trim()) {
      return tools.filter((tool) => tool.trending).slice(0, 6);
    }

    return fuse.search(deferredQuery).map((item) => item.item).slice(0, 12);
  }, [deferredQuery, fuse, tools]);

  const categoryShortcuts = useMemo(() => categories, [categories]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery]);

  function rememberQuery(value: string) {
    const next = [value, ...recentSearches.filter((item) => item !== value)].slice(0, 4);
    setRecentSearches(next);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  function clearRecentSearch(item: string) {
    const next = recentSearches.filter((entry) => entry !== item);
    setRecentSearches(next);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  function openTool(slug: string, searchText?: string) {
    if (searchText?.trim()) {
      rememberQuery(searchText.trim());
    }
    closeSearch();
    router.push(`/tools/${slug}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      openTool(results[activeIndex].id, query);
    }
  }

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-background/80 backdrop-blur-2xl"
          onClick={closeSearch}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="page-shell flex min-h-screen items-start justify-center py-4 sm:py-12"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="glass-card floating-border w-full max-w-[640px] rounded-[32px] p-4 shadow-glass sm:p-6">
              <div className="flex items-center gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] px-5 py-4">
                <Search size={20} className="text-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search 130+ AI tools, categories, and workflows..."
                  className="w-full bg-transparent text-lg text-foreground outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="button-secondary min-h-9 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted"
                >
                  Esc
                </button>
              </div>

              <div className="mt-6 max-h-[70vh] overflow-y-auto pr-1">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
                      {query ? "Search Results" : "Trending Now"}
                    </h2>
                    {query ? (
                      <span className="text-xs text-muted">{results.length} matches</span>
                    ) : null}
                  </div>

                  <div className="grid gap-3">
                    {results.map((tool, index) => (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => openTool(tool.id, query)}
                        className={`flex items-center justify-between rounded-[20px] border px-4 py-4 text-left transition ${
                          activeIndex === index
                            ? "border-cyan/40 bg-cyan/10 shadow-cyan"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                            <Image src={tool.logo} alt="" width={24} height={24} sizes="24px" />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-foreground">{tool.name}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5">
                                {formatCategoryName(tool.category)}
                              </span>
                              <span>{tool.rating.overall.toFixed(1)} rating</span>
                              <span>{tool.pricing.model}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={18} className="ml-3 shrink-0 text-muted" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted">
                      Recent searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.length > 0 ? (
                        recentSearches.map((item) => (
                          <div key={item} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted">
                            <Clock3 size={12} />
                            <button type="button" onClick={() => setQuery(item)} className="hover:text-foreground">
                              {item}
                            </button>
                            <button type="button" onClick={() => clearRecentSearch(item)} aria-label={`Clear ${item}`} className="text-muted hover:text-foreground">
                              <X size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted">Your recent lookups will appear here.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted">
                      Browse by Category
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {categoryShortcuts.map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          onClick={closeSearch}
                          className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted hover:text-foreground"
                        >
                          <span>{category.name}</span>
                          <Sparkles size={16} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted">Trending Now</h3>
                    <div className="grid gap-2">
                      {tools.filter((tool) => tool.trending).slice(0, 5).map((tool) => (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => openTool(tool.id)}
                          className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted hover:text-foreground"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Flame size={13} className="text-amber" />
                            {tool.name}
                          </span>
                          <span className="text-xs">{formatCategoryName(tool.category)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted">Quick Actions</h3>
                    <div className="grid gap-2">
                      <Link href="/tools" onClick={closeSearch} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted hover:text-foreground">
                        Browse all tools
                      </Link>
                      <Link href="/compare" onClick={closeSearch} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted hover:text-foreground">
                        Compare tools
                      </Link>
                      <Link href="/submit-a-tool" onClick={closeSearch} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted hover:text-foreground">
                        Submit a tool
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

