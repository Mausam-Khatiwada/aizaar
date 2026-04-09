import newsData from "@/data/news.json";

export type NewsItem = (typeof newsData)[number];
export type NewsCategory = NewsItem["category"] | "all";

const news = newsData as NewsItem[];

export function getAllNews() {
  return [...news].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export function getFeaturedNews() {
  return getAllNews().find((item) => item.featured) ?? getAllNews()[0];
}

export function getLatestNews(limit = 4) {
  return getAllNews().slice(0, limit);
}

export function getNewsByCategory(category: NewsCategory) {
  if (category === "all") return getAllNews();
  return getAllNews().filter((item) => item.category === category);
}

export function getNewsById(id: string) {
  return getAllNews().find((item) => item.id === id);
}

export function getAllNewsIds() {
  return getAllNews().map((item) => item.id);
}

export function getRelatedNews(id: string, limit = 4) {
  const current = getNewsById(id);
  if (!current) return getLatestNews(limit);

  const related = getAllNews().filter(
    (item) =>
      item.id !== current.id &&
      (item.tool === current.tool ||
        item.category === current.category ||
        item.tags.some((tag) => current.tags.includes(tag))),
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = getAllNews().filter((item) => item.id !== current.id && !related.some((entry) => entry.id === item.id));
  return [...related, ...fallback].slice(0, limit);
}

export function getLatestToolNews(limit = 6) {
  return getAllNews()
    .filter((item) => item.tool !== null)
    .slice(0, limit);
}

function getDayDifference(fromDate: string, toDate: string) {
  const from = new Date(`${fromDate}T00:00:00Z`);
  const to = new Date(`${toDate}T00:00:00Z`);
  const difference = to.getTime() - from.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export function getNewsPulse(referenceDate = new Date().toISOString().slice(0, 10)) {
  const all = getAllNews();
  const weeklyUpdates = all.filter((item) => {
    const diff = getDayDifference(item.publishedAt, referenceDate);
    return diff >= 0 && diff <= 7;
  }).length;
  const monthlyLaunches = all.filter((item) => {
    const diff = getDayDifference(item.publishedAt, referenceDate);
    return item.category === "launch" && diff >= 0 && diff <= 30;
  }).length;
  const monthlyFunding = all.filter((item) => {
    const diff = getDayDifference(item.publishedAt, referenceDate);
    return item.category === "funding" && diff >= 0 && diff <= 30;
  }).length;

  return {
    weeklyUpdates,
    monthlyLaunches,
    monthlyFunding,
  };
}
