import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { AffiliateButton } from "@/components/tools/AffiliateButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { PricingBadge } from "@/components/tools/PricingBadge";
import { ToolRating } from "@/components/tools/ToolRating";
import { Badge } from "@/components/ui/Badge";
import type { Tool } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

export function ToolHero({
  tool,
  compareHref,
  shareUrl,
}: {
  tool: Tool;
  compareHref: string;
  shareUrl: string;
}) {
  const ctaHref = tool.hasAffiliate ? tool.affiliateUrl : tool.website;

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{
        backgroundImage: `${tool.brandGradient}, var(--tool-hero-overlay)`,
      }}
    >
      <div className="page-shell relative z-10 py-14 sm:py-20">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={14} />
          <Link href={`/categories/${tool.category}`} className="hover:text-foreground">
            {formatCategoryName(tool.category)}
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{tool.name}</span>
        </div>

        <div className="grid min-w-0 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-border bg-surface-soft">
                <Image src={tool.logo} alt={`${tool.name} logo`} width={54} height={54} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <PricingBadge model={tool.pricing.model} />
                  {tool.verified ? <Badge className="border-emerald/30 bg-emerald/10 text-emerald">Verified</Badge> : null}
                </div>
                <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{tool.name}</h1>
                <p className="mt-2 max-w-2xl text-lg text-muted">{tool.tagline}</p>
              </div>
            </div>

            <p className="max-w-3xl text-base leading-7 text-muted">{tool.description}</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AffiliateButton href={ctaHref} className="w-full sm:w-auto">
                Visit Website
              </AffiliateButton>
              {tool.pricing.hasFree ? (
                <AffiliateButton href={ctaHref} className="w-full border border-border-bright bg-surface text-foreground shadow-none hover:bg-surface-elevated sm:w-auto">
                  Try Free
                </AffiliateButton>
              ) : null}
              <Link
                href={compareHref}
                className="button-secondary w-full sm:w-auto"
              >
                Compare
              </Link>
              <ShareButton url={shareUrl} />
            </div>
          </div>

          <div className="min-w-0 glass-card rounded-[32px] p-5 sm:p-6">
            <ToolRating rating={tool.rating} />
          </div>
        </div>
      </div>
    </section>
  );
}
