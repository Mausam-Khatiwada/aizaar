"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Clapperboard,
  Clock3,
  Code2,
  Disc3,
  MessagesSquare,
  Mic2,
  Music4,
  Palette,
  PenSquare,
  Presentation,
  SearchCode,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

import type { Category } from "@/lib/tools";

const iconMap = {
  Sparkles,
  Clapperboard,
  Music4,
  Mic2,
  Disc3,
  Presentation,
  PenSquare,
  Code2,
  Palette,
  UserRound,
  SearchCode,
  Clock3,
  Box,
  TrendingUp,
  MessagesSquare,
};

const layoutPattern = [
  "sm:col-span-2 xl:col-span-2 xl:row-span-2",
  "xl:col-span-1 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
  "sm:col-span-2 xl:col-span-2 xl:row-span-2",
  "xl:col-span-1 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
  "xl:col-span-1 xl:row-span-1",
  "sm:col-span-2 xl:col-span-2 xl:row-span-2",
];

const categorySurfaceMap: Record<string, string> = {
  "image-generation": "linear-gradient(140deg, #1a0533 0%, #2d1b69 100%)",
  "video-generation": "linear-gradient(140deg, #0a1628 0%, #1e3a5f 100%)",
  "music-generation": "linear-gradient(140deg, #0d1f12 0%, #1a3d24 100%)",
  "voice-audio": "linear-gradient(140deg, #1f0a0a 0%, #3d1a1a 100%)",
  "coding-development": "linear-gradient(140deg, #0a1a2e 0%, #0f3460 100%)",
  "writing-content": "linear-gradient(140deg, #1a1400 0%, #3d3000 100%)",
  "design-creative": "linear-gradient(140deg, #1a0d1a 0%, #2d1f33 100%)",
  presentation: "linear-gradient(140deg, #0a1f1f 0%, #1a3d3d 100%)",
  "music-video": "linear-gradient(140deg, #271201 0%, #4b2a10 100%)",
  "ai-avatars": "linear-gradient(140deg, #10222d 0%, #1f4459 100%)",
  research: "linear-gradient(140deg, #081e28 0%, #1a3a4d 100%)",
  productivity: "linear-gradient(140deg, #0f200f 0%, #264126 100%)",
  "3d-generation": "linear-gradient(140deg, #10162a 0%, #2d2f66 100%)",
  "seo-marketing": "linear-gradient(140deg, #24110d 0%, #4d2a16 100%)",
  "social-media": "linear-gradient(140deg, #1c1123 0%, #3f2451 100%)",
};

type PreviewItem = {
  id: string;
  name: string;
  logo: string;
};

export function CategoryGrid({
  categories,
  previewMap = {},
}: {
  categories: Category[];
  previewMap?: Record<string, PreviewItem[]>;
}) {
  return (
    <section className="section-shell">
      <div className="mb-10 flex min-w-0 flex-col gap-4 sm:gap-6">
        <div className="min-w-0">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan">What Are You Trying to Do?</p>
          <h2 className="section-title">Pick a workflow and jump straight to the best tools</h2>
          <p className="section-copy mt-4">
            From prompt-heavy creative work to production coding pipelines, browse curated stacks built for real outcomes.
          </p>
        </div>
      </div>

      <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap] ?? Sparkles;
          const sizeClass = layoutPattern[index % layoutPattern.length];
          const previewItems = previewMap[category.id] ?? [];

          return (
            <motion.div
              key={category.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`min-h-[220px] ${sizeClass}`}
            >
              <Link
                href={`/categories/${category.id}`}
                className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-white/10 p-5 text-slate-50 sm:p-6"
                style={{
                  backgroundImage: `${categorySurfaceMap[category.id] ?? category.gradient}, linear-gradient(180deg, rgba(8,11,20,0.88), rgba(8,11,20,0.9))`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_30%)]" />
                  <div className="absolute inset-[1px] rounded-[27px] border border-white/25" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: "spring", stiffness: 350, damping: 16 }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] shadow-[0_18px_30px_rgba(8,11,20,0.35)]"
                    >
                      <Icon size={28} />
                    </motion.div>
                    <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/[0.09] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100">
                      {category.toolCount} tools
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold leading-tight text-slate-50 sm:text-[1.65rem]">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-sm leading-6 text-slate-100/85">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="flex items-center">
                      {previewItems.slice(0, 3).map((tool, logoIndex) => (
                        <span
                          key={tool.id}
                          className="-ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 first:ml-0"
                          style={{ zIndex: 10 - logoIndex }}
                        >
                          <Image src={tool.logo} alt={`${tool.name} logo`} width={16} height={16} sizes="16px" />
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold">
                      Explore
                      <motion.span
                        initial={false}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 360, damping: 18 }}
                        className="inline-flex"
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
