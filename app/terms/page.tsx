import type { Metadata } from "next";

import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using aizaar and its editorial content.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Terms</h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>aizaar content is provided for informational purposes and should not be treated as legal, financial, or regulatory advice.</p>
            <p>Ratings and rankings reflect our editorial judgment at the time of review and may change as products evolve.</p>
            <p>We may earn commission from affiliate links, but that does not increase the price you pay.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
