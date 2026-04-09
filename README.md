# aizaar

Premium AI tools directory built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Fuse.js, JSON data, and MDX blog content.

## Stack

- Next.js App Router
- TypeScript with strict mode
- Tailwind CSS with CSS variable design system
- Framer Motion for motion and micro-interactions
- Fuse.js for client-side fuzzy search
- JSON data for tools and categories
- MDX blog posts rendered from `content/blog`
- MDX tutorial playbooks rendered from `content/tutorials`
- Editorial AI news desk with static detail pages from `data/news.json`

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the dev server:

```bash
pnpm dev
```

3. Open `http://localhost:3000`

## Important Scripts

- `pnpm dev` - Run the development server
- `pnpm build` - Create a production build
- `pnpm start` - Run the production server
- `pnpm lint` - Run linting
- `pnpm generate:content` - Regenerate `tools.json`, `categories.json`, logos, and blog content

## Environment Variables

Copy `.env.example` to `.env.local` and update values as needed.

- `NEXT_PUBLIC_SITE_URL` - Canonical production URL
- `NEXT_PUBLIC_NEWSLETTER_URL` - Hosted newsletter signup URL
- `NEXT_PUBLIC_SUBMIT_TOOL_EMBED_URL` - Tally or Google Form embed URL for submissions

## Content

- Tool data: `data/tools.json`
- Category metadata: `data/categories.json`
- Blog posts: `content/blog/*.mdx`
- Tutorials: `content/tutorials/*.mdx`
- News items: `data/news.json`
- Generated logos: `public/logos/*.svg`

## Advanced Features

- Dynamic compare pages (`/compare/[slug]`) and alternatives pages (`/alternatives/[tool]`)
- News detail pages with related tools and takeaways (`/news/[id]`)
- Advanced tutorial filtering (`/tutorials?level=advanced`)
- Homepage launch radar + advanced playbooks sections
- JSON-LD coverage for website, tools, tutorials, and news pages

## Deployment

This project is designed for Vercel and uses static-first rendering with client-side search and localStorage-powered saved/compare state.
