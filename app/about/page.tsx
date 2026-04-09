import type { Metadata } from "next";

import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what aizaar covers, how we review products, and why the directory exists.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About aizaar</h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>
              aizaar is a premium AI tools directory for developers, freelancers, creators, marketers, and fast-moving digital teams.
            </p>
            <p>
              We focus on practical evaluation: pricing clarity, usability, output quality, and whether a tool genuinely saves time in real workflows.
            </p>
            <p>
              The goal is simple: make it easier to discover the right AI tool without wading through hype, shallow lists, or outdated comparisons.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
