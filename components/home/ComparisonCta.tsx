import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";

export function ComparisonCta() {
  return (
    <section className="section-shell pt-0">
      <div className="floating-border glass-card overflow-hidden rounded-[36px] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple to-cyan text-white">
              <Scale size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Can&apos;t decide between two tools?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Use our free comparison tool to see pricing, features, pros, cons, and platform support side by side.
            </p>
          </div>
          <Link
            href="/compare"
            className="button-primary button-glow w-full justify-center px-6 lg:w-auto lg:justify-center"
          >
            Compare Tools
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
