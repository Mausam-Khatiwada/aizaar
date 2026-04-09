import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

export type Tool = (typeof toolsData)[number];
export type Category = (typeof categoriesData)[number];

export type ToolSort = "trending" | "top-rated" | "newest" | "a-z" | "free-first";
export type PricingFilter = "all" | "free" | "freemium" | "paid";

export const tools = toolsData as Tool[];
export const categories = categoriesData as Category[];

export function getAllTools() {
  return tools;
}

export function getAllCategories() {
  return categories;
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.id === slug);
}

export function getToolsBySlugs(slugs: string[]) {
  const slugSet = new Set(slugs);
  return tools.filter((tool) => slugSet.has(tool.id));
}

export function getFeaturedTools() {
  return tools.filter((tool) => tool.featured).slice(0, 6);
}

export function getTrendingTools() {
  return tools.filter((tool) => tool.trending).slice(0, 8);
}

export function getNewestTools() {
  return tools
    .filter((tool) => tool.new)
    .sort((left, right) => right.lastUpdated.localeCompare(left.lastUpdated))
    .slice(0, 3);
}

export function getRecentlyUpdatedTools(limit = 8) {
  return [...tools].sort((left, right) => right.lastUpdated.localeCompare(left.lastUpdated)).slice(0, limit);
}

export function getToolsForCategory(category: string) {
  return tools.filter(
    (tool) => tool.category === category || tool.secondaryCategories.includes(category),
  );
}

export function getCategoryBySlug(category: string) {
  return categories.find((entry) => entry.id === category);
}

export function getRelatedTools(tool: Tool, limit = 3) {
  const relatedIds = tool.relatedTools.length
    ? tool.relatedTools
    : getToolsForCategory(tool.category)
        .filter((candidate) => candidate.id !== tool.id)
        .slice(0, limit)
        .map((candidate) => candidate.id);
  return getToolsBySlugs(relatedIds).slice(0, limit);
}

export function getAlternativeTools(tool: Tool, limit = 2) {
  return getToolsBySlugs(tool.alternatives).slice(0, limit);
}

function toolMatchesFeature(tool: Tool, feature: string) {
  switch (feature) {
    case "api-access":
      return tool.platforms.includes("api");
    case "mobile-app":
      return tool.platforms.includes("mobile");
    case "free-trial":
      return tool.pricing.hasFree;
    case "open-source":
      return tool.tags.includes("open-source");
    case "commercial-license":
      return (
        tool.tags.includes("commercial") ||
        tool.tags.includes("commercial-license") ||
        tool.description.toLowerCase().includes("commercial")
      );
    default:
      return true;
  }
}

export function filterTools(input: Tool[], options: { category?: string; pricing?: PricingFilter; subcategory?: string; features?: string[] }) {
  return input.filter((tool) => {
    const categoryMatch =
      !options.category ||
      tool.category === options.category ||
      tool.secondaryCategories.includes(options.category);
    const pricingMatch =
      !options.pricing ||
      options.pricing === "all" ||
      tool.pricing.model === options.pricing;
    const subcategoryMatch =
      !options.subcategory || options.subcategory === "all" || tool.subcategory === options.subcategory;
    const featureMatch =
      !options.features || options.features.length === 0 || options.features.every((feature) => toolMatchesFeature(tool, feature));
    return categoryMatch && pricingMatch && subcategoryMatch && featureMatch;
  });
}

export function sortTools(input: Tool[], sort: ToolSort) {
  const items = [...input];
  switch (sort) {
    case "a-z":
      return items.sort((left, right) => left.name.localeCompare(right.name));
    case "newest":
      return items.sort((left, right) => right.lastUpdated.localeCompare(left.lastUpdated));
    case "free-first":
      return items.sort((left, right) => {
        const freeDelta = Number(right.pricing.hasFree) - Number(left.pricing.hasFree);
        if (freeDelta !== 0) return freeDelta;
        return right.rating.overall - left.rating.overall;
      });
    case "top-rated":
      return items.sort((left, right) => right.rating.overall - left.rating.overall);
    case "trending":
    default:
      return items.sort((left, right) => {
        const trendingDelta = Number(right.trending) - Number(left.trending);
        if (trendingDelta !== 0) return trendingDelta;
        return right.rating.overall - left.rating.overall;
      });
  }
}

export function getTickerTools() {
  return ["suno", "cursor", "midjourney", "elevenlabs", "runway-ml", "github-copilot", "gamma"]
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as Tool[];
}

function priceValue(startingPrice: string) {
  if (startingPrice === "$0" || startingPrice.toLowerCase() === "free") return 0;
  const match = startingPrice.match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 9999;
}

export function getComparisonWinner(
  items: Tool[],
  metric: "rating" | "price" | "easeOfUse" | "features" | "valueForMoney" | "support" | "platforms" | "pros",
) {
  if (items.length === 0) return null;
  const sorted = [...items].sort((left, right) => {
    switch (metric) {
      case "price":
        return priceValue(left.pricing.startingPrice) - priceValue(right.pricing.startingPrice);
      case "easeOfUse":
        return right.rating.easeOfUse - left.rating.easeOfUse;
      case "features":
        return right.rating.features - left.rating.features;
      case "valueForMoney":
        return right.rating.valueForMoney - left.rating.valueForMoney;
      case "support":
        return right.rating.support - left.rating.support;
      case "platforms":
        return right.platforms.length - left.platforms.length;
      case "pros":
        return right.pros.length - left.pros.length;
      case "rating":
      default:
        return right.rating.overall - left.rating.overall;
    }
  });
  return sorted[0];
}
