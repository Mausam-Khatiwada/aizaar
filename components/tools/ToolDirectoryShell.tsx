"use client";

import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

import type { Category, PricingFilter, Tool, ToolSort } from "@/lib/tools";
import { createToolSearch } from "@/lib/search";
import { filterTools, sortTools } from "@/lib/tools";
import { useAppShell } from "@/components/providers/AppProviders";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { formatCategoryName } from "@/lib/utils";

export function ToolDirectoryShell({
  tools,
  categories,
  title,
  description,
  lockedCategory,
  aiBrief,
}: {
  tools: Tool[];
  categories: Category[];
  title: string;
  description: string;
  lockedCategory?: string;
  aiBrief?: {
    pulse: { weeklyUpdates: number; monthlyLaunches: number; monthlyFunding: number };
    items: Array<{
      id: string;
      headline: string;
      summary: string;
      publishedAt: string;
    }>;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { notify } = useAppShell();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [visibleCount, setVisibleCount] = useState(24);
  const deferredQuery = useDeferredValue(query);
  const selectedCategory = lockedCategory ?? searchParams.get("category") ?? undefined;
  const pricing = (searchParams.get("pricing") as PricingFilter | null) ?? "all";
  const sort = (searchParams.get("sort") as ToolSort | null) ?? "trending";
  const subcategory = searchParams.get("sub") ?? undefined;
  const features = (searchParams.get("features") ?? "")
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean);
  const viewMode = searchParams.get("view") === "list" ? "list" : "grid";

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, pricing, sort, subcategory, deferredQuery, viewMode, searchParams]);

  const searchableTools = useMemo(() => {
    const base = filterTools(tools, {
      category: selectedCategory,
      pricing,
      subcategory,
      features,
    });

    if (!deferredQuery.trim()) {
      return sortTools(base, sort);
    }

    const fuse = createToolSearch(base);
    return fuse.search(deferredQuery).map((item) => item.item);
  }, [deferredQuery, features, pricing, selectedCategory, sort, subcategory, tools]);

  const visibleTools = searchableTools.slice(0, visibleCount);
  const hasMore = visibleCount < searchableTools.length;
  const hasFilters = Boolean(selectedCategory || pricing !== "all" || subcategory || features.length || deferredQuery);
  const activeFilterChips = [
    selectedCategory ? `Category: ${formatCategoryName(selectedCategory)}` : null,
    subcategory ? `Subcategory: ${subcategory.replace(/-/g, " ")}` : null,
    pricing !== "all" ? `Pricing: ${pricing}` : null,
    ...features.map((feature) => feature.replace(/-/g, " ")),
  ].filter(Boolean) as string[];

  const visibleCategories = categories.filter(
    (category) => !lockedCategory || category.id !== lockedCategory,
  );

  const activeCategory = categories.find((category) => category.id === lockedCategory);
  const subcategories = activeCategory?.subcategories ?? [];

  function updateParams(
    updates: Record<string, string | undefined>,
    historyMode: "push" | "replace" = "push",
  ) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const shouldToast =
      historyMode === "push" &&
      ["category", "pricing", "sort", "sub", "features", "view"].some((key) =>
        Object.prototype.hasOwnProperty.call(updates, key),
      );

    if (shouldToast) {
      notify("Filter applied");
    }
    startTransition(() => {
      router[historyMode](`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    });
  }

  return (
    <div className="section-shell min-w-0 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-muted">{description}</p>
      </div>

      {aiBrief ? (
        <div className="mt-6">
          {/* Lightweight, server-fed brief (keeps directory client-side fast) */}
          <div className="glass-card rounded-[32px] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Latest AI Brief</p>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  Fast-moving updates and headlines worth a quick scan before you pick a tool.
                </p>
              </div>
              <Link href="/news" className="inline-flex shrink-0 text-sm font-semibold text-cyan hover:text-cyan/80">
                Open news
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface-soft px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Updates (7D)</p>
                <p className="mt-1 text-2xl font-extrabold text-foreground">{aiBrief.pulse.weeklyUpdates}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-soft px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Launches (30D)</p>
                <p className="mt-1 text-2xl font-extrabold text-foreground">{aiBrief.pulse.monthlyLaunches}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-soft px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">Funding (30D)</p>
                <p className="mt-1 text-2xl font-extrabold text-foreground">{aiBrief.pulse.monthlyFunding}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-2">
              {aiBrief.items.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group rounded-2xl border border-border bg-surface-soft px-3 py-2.5 hover:border-border-bright sm:px-4 sm:py-3"
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    <p className="min-w-0 line-clamp-2 text-sm font-semibold leading-5 text-foreground group-hover:text-cyan sm:line-clamp-1 sm:leading-normal">
                      {item.headline}
                    </p>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.1em] text-muted sm:text-xs sm:tracking-[0.12em]">
                      {item.publishedAt}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted sm:text-sm sm:leading-6">{item.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-8">
        <ToolSearch
          value={query}
          onChange={(value) => {
            setQuery(value);
            updateParams({ q: value || undefined }, "replace");
          }}
        />
      </div>

      <ToolFilters
        categories={visibleCategories}
        activeCategory={lockedCategory ? undefined : selectedCategory}
        pricing={pricing}
        sort={sort}
        features={features}
        resultsCount={searchableTools.length}
        viewMode={viewMode}
        subcategories={lockedCategory ? subcategories : undefined}
        activeSubcategory={subcategory}
        onSubcategoryChange={(value) => updateParams({ sub: value })}
        onCategoryChange={(value) => updateParams({ category: value, sub: undefined })}
        onPricingChange={(value) => updateParams({ pricing: value })}
        onSortChange={(value) => updateParams({ sort: value })}
        onFeatureToggle={(feature) => {
          const next = features.includes(feature)
            ? features.filter((value) => value !== feature)
            : [...features, feature];
          updateParams({ features: next.length > 0 ? next.join(",") : undefined });
        }}
        onViewModeChange={(value) => updateParams({ view: value === "list" ? "list" : undefined })}
        onClear={() => {
          setQuery("");
          updateParams({
            q: undefined,
            category: undefined,
            pricing: undefined,
            sort: undefined,
            sub: undefined,
            features: undefined,
            view: undefined,
          });
        }}
      />

      {hasFilters ? (
        <div className="mt-5 rounded-2xl border border-border bg-surface-soft p-4">
          <p className="text-sm text-muted">
            Showing {searchableTools.length} tools
            {selectedCategory ? ` in ${formatCategoryName(selectedCategory)}` : ""} {pricing !== "all" ? `| ${pricing}` : ""}
          </p>
          {activeFilterChips.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeFilterChips.map((chip) => (
                <span key={chip} className="rounded-full border border-border bg-surface-soft px-3 py-1 text-xs text-muted">
                  {chip}
                </span>
              ))}
              <button type="button" onClick={() => updateParams({ q: undefined, category: undefined, pricing: undefined, sort: undefined, sub: undefined, features: undefined, view: undefined })} className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                Clear all filters
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6">
        {searchableTools.length === 0 ? (
          <div className="glass-card rounded-[32px] p-10 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-soft">
              <Bot size={36} className="text-cyan" />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold text-foreground">No tools match your filters</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">Try removing some filters or search for a broader use case.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {tools.slice(0, 3).map((tool) => (
                <Link key={tool.id} href={`/tools/${tool.id}`} className="rounded-full border border-border bg-surface-soft px-4 py-2 text-sm text-muted hover:text-foreground">
                  {tool.name}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                updateParams({
                  q: undefined,
                  category: undefined,
                  pricing: undefined,
                  sort: undefined,
                  sub: undefined,
                  features: undefined,
                  view: undefined,
                })
              }
              className="button-primary button-glow mt-6"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid gap-3">
            {visibleTools.map((tool) => (
              <article key={tool.id} className="glass-card rounded-[22px] p-4 hover:border-border-bright">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-soft">
                      <Image src={tool.logo} alt={`${tool.name} logo`} width={22} height={22} sizes="22px" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/tools/${tool.id}`} className="truncate text-lg font-bold text-foreground hover:text-cyan">
                        {tool.name}
                      </Link>
                      <p className="truncate text-sm text-muted">{tool.tagline}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full border border-border bg-surface-soft px-3 py-1 text-muted">
                      {formatCategoryName(tool.category)}
                    </span>
                    <span className="text-muted">{tool.rating.overall.toFixed(1)}</span>
                    <span className="text-muted">{tool.pricing.startingPrice}</span>
                    <Link href={tool.hasAffiliate ? tool.affiliateUrl : tool.website} target="_blank" rel={tool.hasAffiliate ? "nofollow noopener sponsored" : "noopener noreferrer"} className="button-primary min-h-10 px-4 text-xs">
                      Try {tool.name}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <ToolGrid tools={visibleTools} />
        )}
      </div>

      {searchableTools.length > 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm text-muted">
            Showing {Math.min(visibleCount, searchableTools.length)} of {searchableTools.length} tools
          </p>
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 24)}
              className="button-secondary"
            >
              Load 24 more
              <ArrowRight size={16} />
            </button>
          ) : (
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted">
              <Sparkles size={14} className="text-cyan" />
              You reached the end
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
