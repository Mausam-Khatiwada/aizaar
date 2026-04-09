import type { Metadata } from "next";

import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for aizaar visitors and newsletter subscribers.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Privacy</h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>aizaar uses basic analytics, local storage for saved and compared tools, and optional newsletter forms.</p>
            <p>We do not require accounts to browse the directory, and we keep personal data collection deliberately minimal.</p>
            <p>External links, embeds, and affiliate partners may apply their own privacy practices once you leave this site.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
