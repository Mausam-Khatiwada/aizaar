import reviewsData from "@/data/reviews.json";

export type ToolReview = (typeof reviewsData)[number];

const reviews = reviewsData as ToolReview[];

export function getReviewsForTool(toolId: string) {
  return reviews
    .filter((review) => review.toolId === toolId)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getReviewSummary(items: ToolReview[]) {
  if (items.length === 0) {
    return {
      average: 0,
      percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const counts: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const item of items) {
    const rating = Math.max(1, Math.min(5, Math.round(item.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[rating] += 1;
  }

  const average =
    items.reduce((sum, item) => sum + item.rating, 0) / items.length;

  return {
    average,
    percentages: {
      5: Math.round((counts[5] / items.length) * 100),
      4: Math.round((counts[4] / items.length) * 100),
      3: Math.round((counts[3] / items.length) * 100),
      2: Math.round((counts[2] / items.length) * 100),
      1: Math.round((counts[1] / items.length) * 100),
    },
  };
}
