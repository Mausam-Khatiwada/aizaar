export const siteConfig = {
  name: "aizaar",
  tagline: "Every AI Tool You'll Ever Need - Reviewed, Ranked & Ready",
  description:
    "A premium AI tools directory for developers, creators, freelancers, and marketers. Discover, compare, and save the best AI products across every workflow.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aizaar.example",
  newsletterUrl:
    process.env.NEXT_PUBLIC_NEWSLETTER_URL || "https://aizaar.example/newsletter",
  submitToolEmbedUrl:
    process.env.NEXT_PUBLIC_SUBMIT_TOOL_EMBED_URL ||
    "https://tally.so/embed/w2z7o9",
  locale: "en_US",
  creatorRegion: "Built for Creators and Students",
};