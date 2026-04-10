import Link from "next/link";
import { Github, ShieldCheck, Twitter, Youtube } from "lucide-react";

import type { Category } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="theme-footer relative z-10 mt-24">
      <div className="section-shell grid min-w-0 gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.1fr]">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-extrabold">
            <span className="gradient-text">{siteConfig.name}</span>
          </Link>
          <p className="max-w-sm text-sm text-muted">{siteConfig.tagline}</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1.5 text-xs font-semibold text-emerald">
            <ShieldCheck size={14} />
            Independently Reviewed &amp; Verified
          </div>
          <div className="flex items-center gap-3 text-muted">
            <Link href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="icon-button h-10 w-10 hover:text-foreground">
              <Twitter size={16} />
            </Link>
            <Link href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-button h-10 w-10 hover:text-foreground">
              <Github size={16} />
            </Link>
            <Link href={siteConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="icon-button h-10 w-10 hover:text-foreground">
              <Youtube size={16} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Categories</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`} className="hover:text-foreground">
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Resources</h3>
          <div className="mt-4 grid gap-2 text-sm text-muted">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <Link href="/tutorials" className="hover:text-foreground">Tutorials</Link>
            <Link href="/news" className="hover:text-foreground">News</Link>
            <Link href="/insights" className="hover:text-foreground">Insights</Link>
            <Link href="/llm-benchmarks" className="hover:text-foreground">LLM Benchmarks</Link>
            <Link href="/compare" className="hover:text-foreground">Compare Tools</Link>
            <Link href="/submit-a-tool" className="hover:text-foreground">Submit Tool</Link>
            <Link href="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Newsletter</h3>
          <p className="mt-2 text-xs text-muted">Get the best AI tool picks and news delivered weekly. No spam.</p>
          <form className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="surface-input rounded-2xl px-4"
              aria-label="Email address for newsletter"
            />
            <button
              type="button"
              className="button-primary button-glow w-full px-4"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="theme-footer-sub page-shell flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>&copy; {new Date().getFullYear()} {siteConfig.name}. {siteConfig.creatorRegion}</div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
          <Link href="/affiliate-disclosure" className="hover:text-foreground">Affiliate Disclosure</Link>
        </div>
      </div>
    </footer>
  );
}
