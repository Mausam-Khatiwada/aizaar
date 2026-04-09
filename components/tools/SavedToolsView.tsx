"use client";

import Link from "next/link";

import { Heart } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { ToolGrid } from "@/components/tools/ToolGrid";

export function SavedToolsView() {
  const { savedIds, tools } = useAppShell();
  const savedTools = tools.filter((tool) => savedIds.includes(tool.id));

  if (savedTools.length === 0) {
    return (
      <div className="glass-card rounded-[32px] p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple to-cyan text-white">
          <Heart size={24} />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-foreground">No saved tools yet</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Start exploring the directory and tap the heart icon on any card to build your shortlist.
        </p>
        <Link
          href="/tools"
          className="button-primary button-glow mt-6"
        >
          Explore tools
        </Link>
      </div>
    );
  }

  return <ToolGrid tools={savedTools} />;
}
