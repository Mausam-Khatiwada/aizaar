"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { RatingStars } from "@/components/ui/RatingStars";
import type { ToolReview } from "@/lib/reviews";

const STORAGE_KEY = "toolverse-helpful-votes";

function getStoredVotes(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

export function CommunityReviews({
  reviews,
  average,
  breakdown,
}: {
  reviews: ToolReview[];
  average: number;
  breakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
}) {
  const { notify } = useAppShell();
  const [expanded, setExpanded] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>(() => getStoredVotes());
  const [writeOpen, setWriteOpen] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, 3);

  const totalCount = reviews.length;
  const effectiveAverage = useMemo(() => (totalCount ? average : 0), [average, totalCount]);

  function voteHelpful(reviewId: string) {
    const next = { ...votes, [reviewId]: (votes[reviewId] ?? 0) + 1 };
    setVotes(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    notify("Thanks for the feedback", "success");
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">What Users Are Saying</p>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground">Community Reviews</h2>
        </div>
        <button type="button" onClick={() => setWriteOpen(true)} className="button-secondary">
          Write a Review
        </button>
      </div>

      <div className="glass-card rounded-[28px] p-5">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <div>
            <div className="text-5xl font-extrabold text-foreground">{effectiveAverage.toFixed(1)}</div>
            <RatingStars rating={effectiveAverage} size={16} />
            <p className="mt-2 text-sm text-muted">Based on {totalCount} community reviews</p>
          </div>
          <div className="grid gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-muted">{star}★</span>
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple to-cyan" style={{ width: `${breakdown[star as 1 | 2 | 3 | 4 | 5]}%` }} />
                </div>
                <span className="w-10 text-right text-muted">{breakdown[star as 1 | 2 | 3 | 4 | 5]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {visible.map((review) => (
          <article key={review.id} className="glass-card rounded-[24px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple to-cyan text-sm font-bold text-white">
                  {review.authorName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.authorName}</p>
                  <p className="text-sm text-muted">
                    {review.authorTitle} | {review.authorCountry}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <RatingStars rating={review.rating} size={14} />
                <p className="mt-1 text-xs text-muted">{review.date}</p>
              </div>
            </div>

            <h3 className="mt-4 text-lg font-bold text-foreground">{review.headline}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{review.review}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              {review.verified ? (
                <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-semibold uppercase tracking-[0.12em] text-emerald">
                  Verified User
                </span>
              ) : (
                <span />
              )}
              <button type="button" onClick={() => voteHelpful(review.id)} className="inline-flex items-center gap-1 text-muted hover:text-foreground">
                <ThumbsUp size={13} />
                {review.helpful + (votes[review.id] ?? 0)} found this helpful
              </button>
            </div>
          </article>
        ))}
      </div>

      {reviews.length > 3 ? (
        <button type="button" onClick={() => setExpanded((current) => !current)} className="button-secondary mt-5">
          {expanded ? "Show less reviews" : `Show all ${reviews.length} reviews`}
        </button>
      ) : null}

      {writeOpen ? (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-background/80 px-4 backdrop-blur-xl"
          onClick={() => setWriteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-xl rounded-[28px] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-2xl font-extrabold text-foreground">Write a Review</h3>
            <p className="mt-2 text-sm text-muted">Share your experience and we will review your submission before publishing.</p>
            <form className="mt-5 grid gap-3" onSubmit={(event) => event.preventDefault()}>
              <input type="text" placeholder="Your name" className="surface-input rounded-2xl px-4" />
              <select className="min-h-11 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground outline-none">
                <option>5 stars</option>
                <option>4 stars</option>
                <option>3 stars</option>
                <option>2 stars</option>
                <option>1 star</option>
              </select>
              <input type="text" placeholder="Headline" className="surface-input rounded-2xl px-4" />
              <textarea placeholder="Your review" className="min-h-[130px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none" />
              <a
                href="mailto:hello@aizaar.example?subject=Review%20Submission"
                className="button-primary button-glow"
                onClick={() => {
                  notify("Thanks! We'll review your submission.", "success");
                  setWriteOpen(false);
                }}
              >
                Submit Review
              </a>
            </form>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
