import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { AffiliateButton } from "@/components/tools/AffiliateButton";
import type { Tool } from "@/lib/tools";
import { formatCategoryName } from "@/lib/utils";

export function AiOfWeek({ tool }: { tool: Tool }) {
  const ctaHref = tool.hasAffiliate ? tool.affiliateUrl : tool.website;

  return (
    <section className="section-shell pt-0">
      <div className="floating-border overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">AI of the Week</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/15 bg-white/[0.07]">
                <Image src={tool.logo} alt={`${tool.name} logo`} width={48} height={48} sizes="48px" />
              </div>
              <div>
                <span className="inline-flex rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald">
                  This Week&apos;s Top Pick
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">{tool.name}</h2>
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{tool.description}</p>

            <div className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs uppercase tracking-[0.16em]">Users</span>
                <div className="mt-1 font-semibold text-foreground">{tool.usersCount}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs uppercase tracking-[0.16em]">Rating</span>
                <div className="mt-1 font-semibold text-foreground">{tool.rating.overall.toFixed(1)} / 5</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="text-xs uppercase tracking-[0.16em]">Pricing</span>
                <div className="mt-1 font-semibold text-foreground">{tool.pricing.startingPrice}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AffiliateButton href={ctaHref} className="w-full justify-center px-5 sm:w-auto">
                Try It Free
              </AffiliateButton>
              <Link href={`/tools/${tool.id}`} className="button-secondary w-full justify-center px-5 sm:w-auto">
                Read Full Review
              </Link>
            </div>
          </div>

          <aside className="glass-card rounded-[26px] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Why we love it</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {tool.highlights.slice(0, 3).map((item) => (
                <li key={item.title} className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald" />
                  <span>
                    <span className="font-semibold text-foreground">{item.title}: </span>
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">
              Category: {formatCategoryName(tool.category)}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
