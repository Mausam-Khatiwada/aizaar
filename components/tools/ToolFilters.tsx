"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Grid2X2, List, SlidersHorizontal, X } from "lucide-react";

import type { Category, PricingFilter, ToolSort } from "@/lib/tools";

type ToolFiltersProps = {
  categories: Array<Pick<Category, "id" | "name">>;
  activeCategory?: string;
  pricing: PricingFilter;
  sort: ToolSort;
  features: string[];
  resultsCount: number;
  viewMode: "grid" | "list";
  onCategoryChange: (value?: string) => void;
  onPricingChange: (value: PricingFilter) => void;
  onSortChange: (value: ToolSort) => void;
  onFeatureToggle: (feature: string) => void;
  onViewModeChange: (value: "grid" | "list") => void;
  onClear: () => void;
  subcategories?: string[];
  activeSubcategory?: string;
  onSubcategoryChange?: (value?: string) => void;
};

const pricingOptions: PricingFilter[] = ["all", "free", "freemium", "paid"];
const sortOptions: Array<{ label: string; value: ToolSort }> = [
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Newest", value: "newest" },
  { label: "A-Z", value: "a-z" },
  { label: "Free First", value: "free-first" },
];

const featureOptions = [
  { value: "api-access", label: "API Access" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "free-trial", label: "Free Trial" },
  { value: "open-source", label: "Open Source" },
  { value: "commercial-license", label: "Commercial License" },
];

const categoryCode: Record<string, string> = {
  "image-generation": "IMG",
  "video-generation": "VID",
  "music-generation": "MUS",
  "voice-audio": "VOI",
  "coding-development": "DEV",
  "writing-content": "WRT",
  "design-creative": "DSN",
  presentation: "PPT",
  "ai-avatars": "AVA",
  research: "RSH",
  "social-media": "SOC",
  "3d-generation": "3D",
  "seo-marketing": "SEO",
  "music-video": "MV",
  productivity: "PRD",
};

export function ToolFilters({
  categories,
  activeCategory,
  pricing,
  sort,
  features,
  resultsCount,
  viewMode,
  onCategoryChange,
  onPricingChange,
  onSortChange,
  onFeatureToggle,
  onViewModeChange,
  onClear,
  subcategories,
  activeSubcategory,
  onSubcategoryChange,
}: ToolFiltersProps) {
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasActiveFilters = Boolean(activeCategory || pricing !== "all" || activeSubcategory || features.length > 0);

  return (
    <div className="sticky top-[calc(var(--header-height)+12px)] z-30 mt-8 w-full min-w-0 max-w-full">
      <div className="glass-card w-full min-w-0 max-w-full rounded-[28px] p-3 sm:p-4">
        <div className="hide-scrollbar -mx-1 flex w-full min-w-0 gap-2 overflow-x-auto px-1 pb-2">
          <Pill active={!activeCategory} label="All" onClick={() => onCategoryChange(undefined)} />
          {categories.map((category) => (
            <Pill
              key={category.id}
              active={activeCategory === category.id}
              label={`${categoryCode[category.id] ?? "CAT"} ${category.name}`}
              onClick={() => onCategoryChange(activeCategory === category.id ? undefined : category.id)}
            />
          ))}
        </div>

        {subcategories && subcategories.length > 0 ? (
          <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto">
            <Pill
              active={!activeSubcategory}
              label="All subcategories"
              onClick={() => onSubcategoryChange?.(undefined)}
            />
            {subcategories.map((subcategory) => (
              <Pill
                key={subcategory}
                active={activeSubcategory === subcategory}
                label={subcategory.replace(/-/g, " ")}
                onClick={() =>
                  onSubcategoryChange?.(activeSubcategory === subcategory ? undefined : subcategory)
                }
              />
            ))}
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
          <button type="button" onClick={() => setMobileOpen(true)} className="button-secondary min-h-10 px-4">
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <div className="text-sm text-muted">{resultsCount} tools</div>
          <div className="surface-card inline-flex rounded-full p-1">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => onViewModeChange("grid")}
              className={`rounded-full px-2 py-2 transition ${viewMode === "grid" ? "bg-surface-elevated text-foreground" : "text-muted"}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => onViewModeChange("list")}
              className={`rounded-full px-2 py-2 transition ${viewMode === "list" ? "bg-surface-elevated text-foreground" : "text-muted"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 hidden flex-col gap-3 md:flex lg:flex-row lg:items-center lg:justify-between">
          <div className="hide-scrollbar flex flex-wrap gap-2 overflow-x-auto">
            {pricingOptions.map((option) => (
              <Pill
                key={option}
                active={pricing === option}
                label={option === "all" ? "All" : option === "free" ? "Free" : option === "freemium" ? "Freemium" : "Paid"}
                onClick={() => onPricingChange(option)}
              />
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFeatureMenu((current) => !current)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  features.length > 0
                    ? "border-transparent bg-gradient-to-r from-purple to-cyan text-white shadow-purple"
                    : "border-border bg-surface-soft text-muted hover:border-border-bright hover:text-foreground"
                }`}
              >
                Features
              </button>
              {showFeatureMenu ? (
                <div className="absolute right-0 top-12 z-20 w-[230px] rounded-2xl border border-border bg-background/95 p-3 backdrop-blur-xl">
                  {featureOptions.map((option) => {
                    const checked = features.includes(option.value);
                    return (
                      <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-sm text-muted hover:bg-surface-soft">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onFeatureToggle(option.value)}
                          className="h-4 w-4 rounded border-border-bright bg-surface-soft accent-cyan"
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Showing {resultsCount} tools</span>
            <label className="inline-flex items-center gap-2 text-sm text-muted">
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value as ToolSort)}
                className="surface-select min-h-11 rounded-full px-4 py-2 text-sm text-foreground outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="surface-card inline-flex rounded-full p-1">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => onViewModeChange("grid")}
                className={`rounded-full px-2 py-2 transition ${viewMode === "grid" ? "bg-surface-elevated text-foreground" : "text-muted"}`}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => onViewModeChange("list")}
                className={`rounded-full px-2 py-2 transition ${viewMode === "list" ? "bg-surface-elevated text-foreground" : "text-muted"}`}
              >
                <List size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="button-secondary min-h-11 px-4 text-muted hover:text-foreground"
            >
              {hasActiveFilters ? (
                <>
                  <X size={14} />
                  Clear
                </>
              ) : (
                <>
                  <SlidersHorizontal size={14} />
                  Filters
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[82] flex items-end bg-black/65 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-full max-h-[80vh] overflow-y-auto rounded-t-[28px] border-t border-border bg-background p-4 pb-[calc(env(safe-area-inset-bottom)+72px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-foreground">Filters</h3>

            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted">Pricing</p>
              <div className="flex flex-wrap gap-2">
                {pricingOptions.map((option) => (
                  <Pill
                    key={`mobile-${option}`}
                    active={pricing === option}
                    label={option === "all" ? "All" : option === "free" ? "Free" : option === "freemium" ? "Freemium" : "Paid"}
                    onClick={() => onPricingChange(option)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted">Sort</p>
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value as ToolSort)}
                className="surface-select min-h-11 w-full rounded-2xl px-4 text-sm text-foreground outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={`mobile-sort-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted">Features</p>
              <div className="grid gap-2">
                {featureOptions.map((option) => (
                  <label key={`mobile-feature-${option.value}`} className="flex items-center gap-2 text-sm text-muted">
                    <input
                      type="checkbox"
                      checked={features.includes(option.value)}
                      onChange={() => onFeatureToggle(option.value)}
                      className="h-4 w-4 rounded border-border-bright bg-surface-soft accent-cyan"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="button-primary mt-6 w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Pill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onClick}
      className={`min-h-10 whitespace-nowrap rounded-full border px-3 py-2 text-[13px] font-medium transition sm:min-h-11 sm:px-4 sm:text-sm ${
        active
          ? "border-transparent bg-gradient-to-r from-purple to-cyan text-white shadow-purple"
          : "border-border bg-surface-soft text-muted hover:border-border-bright hover:text-foreground"
      }`}
    >
      {label}
    </motion.button>
  );
}