"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CircleHelp, Menu, MoonStar, Search, SunMedium } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/compare", label: "Compare" },
];

export function Header() {
  const router = useRouter();
  const { openSearch, theme, toggleTheme, mobileNavOpen, openMobileNav, closeMobileNav } = useAppShell();
  const [scrolled, setScrolled] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isFormField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isFormField) return;
      if (!(event.metaKey || event.ctrlKey)) return;

      const key = event.key.toLowerCase();
      if (key === "b") {
        event.preventDefault();
        router.push("/blog");
      }
      if (key === "t") {
        event.preventDefault();
        router.push("/tools");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition",
          scrolled
            ? theme === "dark"
              ? "border-b border-white/10 bg-background/80 backdrop-blur-xl"
              : "border-b border-slate-900/10 bg-white/80 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="page-shell flex h-[var(--header-height)] items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-cyan text-base font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.55)]">
                <span className="absolute inset-[2px] rounded-[0.9rem] bg-black/40" />
                <span className="relative tracking-tight">AI</span>
              </span>
              <div className="flex flex-col leading-none">
                <span className="gradient-text text-xl font-extrabold tracking-tight sm:text-2xl">
                  {siteConfig.name}
                </span>
                <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:block">
                  AI Tools Directory
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={openSearch}
              className="button-secondary min-h-11 gap-2 px-4 text-muted hover:border-border-bright hover:text-foreground"
            >
              <Search size={16} />
              <span>Search</span>
              <span className="inline-flex h-6 items-center rounded-full border border-white/10 px-2 text-[11px] uppercase tracking-[0.24em]">
                Cmd K
              </span>
            </button>
            <Link
              href="/submit-a-tool"
              className="button-secondary min-h-11 px-4 hover:border-border-bright"
            >
              Submit a Tool
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="icon-button hover:border-border-bright hover:text-foreground"
            >
              {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setShortcutsOpen(true)}
              aria-label="Keyboard shortcuts"
              className="icon-button hover:border-border-bright hover:text-foreground"
            >
              <CircleHelp size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              className="icon-button"
            >
              <Search size={18} />
            </button>
            <button
              type="button"
              onClick={openMobileNav}
              aria-label="Open navigation menu"
              className="icon-button"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={closeMobileNav} onSearch={openSearch} />

      {shortcutsOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 px-4 backdrop-blur-xl"
          onClick={() => setShortcutsOpen(false)}
        >
          <div
            className="glass-card w-full max-w-md rounded-[28px] p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold text-foreground">Keyboard Shortcuts</h2>
            <div className="mt-5 grid gap-2 text-sm text-muted">
              <ShortcutRow label="Open Search" value="Cmd/Ctrl + K" />
              <ShortcutRow label="Go to Blog" value="Cmd/Ctrl + B" />
              <ShortcutRow label="Go to Tools" value="Cmd/Ctrl + T" />
              <ShortcutRow label="Close Modals" value="Esc" />
              <ShortcutRow label="Search Navigation" value="Arrow keys + Enter" />
            </div>
            <button type="button" onClick={() => setShortcutsOpen(false)} className="button-primary mt-6 w-full">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ShortcutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <span>{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
