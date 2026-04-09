"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Heart, Scale } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { AffiliateButton } from "@/components/tools/AffiliateButton";
import { PricingBadge } from "@/components/tools/PricingBadge";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { RatingStars } from "@/components/ui/RatingStars";
import { Tooltip } from "@/components/ui/Tooltip";
import type { Tool } from "@/lib/tools";
import { formatCategoryName, cn } from "@/lib/utils";

export function ToolCard({
  tool,
  compact = false,
}: {
  tool: Tool;
  compact?: boolean;
}) {
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useAppShell();
  const saved = isSaved(tool.id);
  const compared = isCompared(tool.id);
  const ctaHref = tool.hasAffiliate ? tool.affiliateUrl : tool.website;

  return (
    <motion.article layout whileHover={{ y: -4 }} className="h-full w-full min-w-0 max-w-full">
      <GlowCard className="group flex h-full flex-col overflow-hidden p-0">
        <div className="h-1.5 w-full" style={{ backgroundImage: tool.brandGradient }} />

        <div className="flex h-full flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-[0_18px_48px_rgba(124,58,237,0.18)]">
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={36}
                  height={36}
                  sizes="36px"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/tools/${tool.id}`}
                    className="truncate text-lg font-semibold text-foreground transition hover:text-cyan"
                  >
                    {tool.name}
                  </Link>
                  {tool.sponsored ? <Badge className="border-amber/30 bg-amber/10 text-amber">Sponsored</Badge> : null}
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{tool.tagline}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Tooltip label={`Based on ${tool.reviewCount} reviews`}>
              <span className="flex items-center gap-2">
                <RatingStars rating={tool.rating.overall} />
                <span className="text-sm font-semibold text-foreground">{tool.rating.overall.toFixed(1)}</span>
              </span>
            </Tooltip>
            <Tooltip label={tool.pricing.hasFree ? tool.pricing.freeDetails : "Paid plan required"}>
              <span>
                <PricingBadge model={tool.pricing.model} />
              </span>
            </Tooltip>
            <span className="text-right text-xs uppercase tracking-[0.2em] text-muted">
              {formatCategoryName(tool.category)}
            </span>
          </div>

          {!compact ? (
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{tool.description}</p>
          ) : null}

          <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="shrink-0 whitespace-nowrap">{tag.replace(/-/g, " ")}</Badge>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-6 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-3">
            <AffiliateButton href={ctaHref} className="min-h-11 w-full justify-center px-4 sm:flex-1 sm:w-auto">
              {tool.pricing.hasFree ? "Try Free" : "Visit Site"}
            </AffiliateButton>
            <div className="flex justify-end gap-2 sm:contents">
              <button
                type="button"
                onClick={() => toggleCompare(tool.id)}
                aria-label={compared ? `Remove ${tool.name} from comparison` : `Compare ${tool.name}`}
                aria-pressed={compared}
                className={cn(
                  "icon-button shrink-0 transition",
                  compared
                    ? "border-cyan/40 bg-cyan/10 text-cyan"
                    : "border-white/10 bg-white/[0.03] text-muted hover:text-foreground",
                )}
              >
                <Scale size={18} />
              </button>
              <button
                type="button"
                onClick={() => toggleSaved(tool.id)}
                aria-label={saved ? `Remove ${tool.name} from saved tools` : `Save ${tool.name}`}
                aria-pressed={saved}
                className={cn(
                  "icon-button shrink-0 transition",
                  saved
                    ? "border-rose/40 bg-rose/10 text-rose-300"
                    : "border-white/10 bg-white/[0.03] text-muted hover:text-foreground",
                )}
              >
                <motion.span whileTap={{ scale: 0.86 }} animate={{ scale: saved ? [1, 1.16, 1] : 1 }}>
                  <Heart size={18} className={saved ? "fill-current" : ""} />
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.article>
  );
}
