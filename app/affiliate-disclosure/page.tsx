import type { Metadata } from "next";

import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How aizaar handles affiliate links, sponsored listings, and editorial independence.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Affiliate Disclosure</h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>aizaar earns commission from affiliate links at no extra cost to you.</p>
            <p>Some listings may also be marked as sponsored. Sponsored status is always labeled directly on the card or page.</p>
            <p>Our editorial team still evaluates tools on usability, output quality, pricing clarity, and overall fit for the audience.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
