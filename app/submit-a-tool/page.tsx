import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description: "Have a product the aizaar audience should know about? Submit it for review.",
  alternates: {
    canonical: "/submit-a-tool",
  },
};

export default function SubmitToolPage() {
  return (
    <PageTransition>
      <section className="section-shell pt-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Submit a tool</h1>
          <p className="mt-4 text-lg text-muted">
            Share your product with the aizaar editorial team. We review every submission for fit, quality, and user value.
          </p>
        </div>

        <div className="mt-10 glass-card min-w-0 overflow-hidden rounded-[32px] p-2 sm:p-3">
          <iframe
            title="Submit a tool form"
            src={siteConfig.submitToolEmbedUrl}
            className="min-h-[70vh] w-full min-w-0 rounded-[26px] border-0 bg-white sm:min-h-[780px]"
          />
        </div>
      </section>
    </PageTransition>
  );
}
