import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { AffiliateButton } from "@/components/tools/AffiliateButton";
import { PricingBadge } from "@/components/tools/PricingBadge";
import { RatingStars } from "@/components/ui/RatingStars";
import type { Tool } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

export function FeaturedTools({ tools }: { tools: Tool[] }) {
  const [lead, ...rest] = tools.slice(0, 6);
  if (!lead) return null;

  return (
    <section className="section-shell min-w-0 pt-0">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-5">
        <div className="min-w-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Our Team&apos;s Current Favorites</p>
          <h2 className="section-title">Hand-picked by our editorial team</h2>
        </div>
        <Link href="/tools" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan hover:text-cyan/80">
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-3">
        <article
          className="group relative min-w-0 max-w-full overflow-hidden rounded-[32px] border border-white/15 p-5 sm:p-7 lg:col-span-2"
          style={{ backgroundImage: `${lead.brandGradient}, linear-gradient(180deg, rgba(8,11,20,0.9), rgba(8,11,20,0.96))` }}
        >
          <div className="absolute right-4 top-4 max-w-[calc(100%-2rem)] rounded-full border border-amber/30 bg-amber/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber sm:right-6 sm:top-6 sm:px-3 sm:text-xs sm:tracking-[0.18em]">
            Editor&apos;s Choice
          </div>
          <div className="relative z-10 flex h-full flex-col pt-10 sm:pt-0">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <Image src={lead.logo} alt={`${lead.name} logo`} width={42} height={42} sizes="42px" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200/80">
                  {formatCategoryName(lead.category)}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{lead.name}</h3>
              </div>
            </div>

            <p className="mt-5 max-w-2xl break-words text-base leading-7 text-slate-100/88">{lead.description}</p>

            <ul className="mt-5 grid gap-2 text-sm text-white/85">
              {lead.highlights.slice(0, 3).map((item) => (
                <li key={item.title} className="break-words rounded-xl border border-white/10 bg-black/20 px-3 py-2">
                  {item.title}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AffiliateButton
                href={lead.hasAffiliate ? lead.affiliateUrl : lead.website}
                className="w-full min-w-0 justify-center whitespace-normal px-5 text-center text-sm sm:w-auto sm:whitespace-nowrap sm:text-base"
              >
                Try {lead.name} Free
              </AffiliateButton>
              <Link href={`/tools/${lead.id}`} className="button-secondary w-full justify-center border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 sm:w-auto">
                See Full Review
              </Link>
            </div>
          </div>
        </article>

        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((tool) => (
            <article key={tool.id} className="glass-card min-w-0 max-w-full rounded-[24px] p-4">
              <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
                <span className="min-w-0 max-w-full truncate rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {formatCategoryName(tool.category)}
                </span>
                <span className="shrink-0">
                  <PricingBadge model={tool.pricing.model} />
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Image src={tool.logo} alt={`${tool.name} logo`} width={22} height={22} sizes="22px" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link href={`/tools/${tool.id}`} className="truncate text-base font-bold text-foreground hover:text-cyan">
                      {tool.name}
                    </Link>
                    <span className="text-xs font-semibold text-muted">{tool.rating.overall.toFixed(1)}</span>
                  </div>
                  <p className="truncate text-sm text-muted">{tool.tagline}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <RatingStars rating={tool.rating.overall} />
              </div>

              <div className="mt-4 min-w-0">
                <AffiliateButton
                  href={tool.hasAffiliate ? tool.affiliateUrl : tool.website}
                  className="w-full min-w-0 justify-center whitespace-normal text-center text-sm sm:whitespace-nowrap sm:text-base"
                >
                  Try {tool.name} Free
                </AffiliateButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
