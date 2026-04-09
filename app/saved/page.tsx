import type { Metadata } from "next";

import { SavedToolsView } from "@/components/tools/SavedToolsView";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Saved Tools",
  description: "Your saved AI tools shortlist, stored locally so you can come back without an account.",
  alternates: {
    canonical: "/saved",
  },
};

export default function SavedPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Saved tools</h1>
          <p className="mt-4 text-lg text-muted">
            Your private shortlist is stored locally in the browser. No login, no friction.
          </p>
        </div>
        <SavedToolsView />
      </section>
    </PageTransition>
  );
}
