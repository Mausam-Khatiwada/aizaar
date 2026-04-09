import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function Newsletter() {
  return (
    <section className="section-shell pt-0">
      <div className="glass-card rounded-[36px] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Get Weekly AI Tool Picks</p>
            <h2 className="section-title">No spam. Just the best new tools, every Monday morning.</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Subscribe for high-signal launches, useful comparisons, and workflow picks that are actually worth your time.
            </p>
          </div>

          <form className="grid w-full min-w-0 gap-3 sm:min-w-[280px] sm:max-w-md sm:grid-cols-[1fr_auto] lg:max-w-none lg:min-w-[360px]">
            <input
              type="email"
              placeholder="Your email address"
              className="surface-input min-w-0"
            />
            <button
              type="button"
              className="button-primary button-glow w-full justify-center sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
        <Link href={siteConfig.newsletterUrl} className="mt-5 inline-flex text-sm text-cyan hover:text-cyan/80">
          Prefer ConvertKit? Open the hosted form.
        </Link>
      </div>
    </section>
  );
}
