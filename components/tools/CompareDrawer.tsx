"use client";

import { useMemo } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Scale, X } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";

export function CompareDrawer() {
  const { compareIds, removeCompare, clearCompare, tools } = useAppShell();
  const items = useMemo(
    () => tools.filter((tool) => compareIds.includes(tool.id)),
    [compareIds, tools],
  );

  return (
    <AnimatePresence>
      {items.length > 0 ? (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-[72] border-t border-white/10 bg-background/92 backdrop-blur-2xl"
        >
          <div className="page-shell flex min-w-0 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto pb-1">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple to-cyan text-white">
                <Scale size={18} />
              </div>
              {items.map((tool) => (
                <div
                  key={tool.id}
                  className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">{tool.name}</div>
                    <div className="text-xs text-muted">{tool.pricing.startingPrice}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCompare(tool.id)}
                    aria-label={`Remove ${tool.name} from comparison`}
                    className="icon-button h-8 w-8 hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={clearCompare}
                className="button-secondary min-h-11 w-full px-4 text-muted hover:text-foreground sm:w-auto"
              >
                Clear
              </button>
              <Link
                href={`/compare?tools=${items.map((tool) => tool.id).join(",")}`}
                className="button-primary button-glow inline-flex w-full justify-center sm:w-auto"
              >
                Compare Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
