"use client";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function MobileNav({
  open,
  onClose,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/categories", label: "Categories" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/news", label: "News" },
    { href: "/insights", label: "Insights" },
    { href: "/blog", label: "Blog" },
    { href: "/compare", label: "Compare" },
    { href: "/saved", label: "Saved" },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-background/96 backdrop-blur-xl"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="page-shell flex h-full min-w-0 flex-col py-6"
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose} className="text-xl font-extrabold">
                <span className="gradient-text">{siteConfig.name}</span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="icon-button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="hide-scrollbar mt-10 flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+24px)]">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-4 text-lg font-semibold text-foreground"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={18} className="text-muted" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  onSearch();
                  onClose();
                }}
                className="button-secondary gap-2"
              >
                <Search size={16} />
                Search tools
              </button>
              <Link
                href="/submit-a-tool"
                onClick={onClose}
                className="button-primary button-glow"
              >
                Submit a Tool
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
