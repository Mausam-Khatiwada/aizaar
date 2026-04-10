"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, BadgeCheck, Play, Rocket } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";

const stackCards = [
  {
    name: "Midjourney",
    tag: "Image",
    badge: "Editor's pick",
    metric: "Cinematic image quality for campaigns and storytelling",
    rating: "4.8/5",
    users: "21M+",
    momentum: 88,
    confidence: 76,
    tint: "linear-gradient(135deg, rgba(14, 116, 144, 0.5), rgba(56, 189, 248, 0.25))",
  },
  {
    name: "Cursor",
    tag: "Code",
    badge: "Developer favorite",
    metric: "Context-aware coding assistant with native editor workflows",
    rating: "4.7/5",
    users: "1M+",
    momentum: 82,
    confidence: 70,
    tint: "linear-gradient(135deg, rgba(124, 58, 237, 0.45), rgba(6, 182, 212, 0.24))",
  },
  {
    name: "ElevenLabs",
    tag: "Audio",
    badge: "Voice leader",
    metric: "Studio-grade voice cloning and multilingual narration",
    rating: "4.8/5",
    users: "12M+",
    momentum: 79,
    confidence: 66,
    tint: "linear-gradient(135deg, rgba(59, 130, 246, 0.42), rgba(6, 182, 212, 0.2))",
  },
] as const;

/**
 * Centered stack: x stays 0 so Framer transforms don’t fight Tailwind centering.
 * Only light rotate + vertical offset so the deck stays visually centered in the column.
 */
const stackLayout = [
  { top: 0, rotate: -2, scale: 1, opacity: 1, z: 30 },
  { top: 52, rotate: 1.5, scale: 0.97, opacity: 0.95, z: 20 },
  { top: 104, rotate: -1, scale: 0.94, opacity: 0.9, z: 10 },
] as const;

type StackOrder = [number, number, number];

export function Hero() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useAppShell();
  const isDark = theme === "dark";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  /** order[0] = card index on top, then middle, then back */
  const [stackOrder, setStackOrder] = useState<StackOrder>([0, 1, 2]);

  const bringToFront = useCallback((cardIndex: number) => {
    setStackOrder((prev) => {
      if (prev[0] === cardIndex) return prev;
      const rest = prev.filter((i) => i !== cardIndex);
      return [cardIndex, rest[0]!, rest[1]!] as StackOrder;
    });
  }, []);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 18 });
  const perspective = useMotionTemplate`perspective(1200px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`;

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const target = panelRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) / 28;
    const deltaY = (event.clientY - centerY) / 28;
    rotateY.set(deltaX);
    rotateX.set(-deltaY);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    setHoveredIndex(null);
  }

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mesh-gradient" aria-hidden="true" />
      <div className="hero-grid hero-grid-40 absolute inset-0 opacity-35" aria-hidden="true" />
      <div className="hero-orb hero-orb-purple" aria-hidden="true" />
      <div className="hero-orb hero-orb-cyan" aria-hidden="true" />

      <div className="page-shell relative z-10 py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-xs text-muted sm:px-4 sm:text-sm"
            >
              <Rocket size={13} className="shrink-0 text-cyan" />
              <span className="rounded-full border border-purple/40 px-2 py-0.5 text-[10px] sm:text-[11px]">130+ Tools | Updated Weekly</span>
            </motion.div>

            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl font-extrabold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl"
              >
                Find the Right
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-purple via-violet-300 to-cyan bg-clip-text text-5xl font-extrabold leading-[0.95] text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
              >
                AI Tool
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-4xl font-extrabold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl"
              >
                For Any Task
              </motion.h1>
            </div>

            <p className="mt-7 max-w-[480px] text-base leading-7 text-muted sm:text-lg sm:leading-8">
              The most comprehensive AI tools directory for developers, freelancers, and creators. Honest reviews. Real ratings. Zero fluff.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/tools" className="button-primary button-glow w-full justify-center px-6 sm:w-auto">
                Explore 130+ Tools
                <ArrowRight size={16} />
              </Link>
              <Link href="/tutorials" className="button-secondary w-full justify-center px-6 sm:w-auto">
                <Play size={16} />
                Watch 2-min tour
              </Link>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex -space-x-3">
                {["AR", "NM", "SK", "RJ", "PA"].map((initials, index) => (
                  <div
                    key={initials}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-white shadow-lg"
                    style={{
                      background: [
                        "linear-gradient(135deg, #7C3AED, #3B82F6)",
                        "linear-gradient(135deg, #0EA5E9, #14B8A6)",
                        "linear-gradient(135deg, #F43F5E, #FB7185)",
                        "linear-gradient(135deg, #F59E0B, #F97316)",
                        "linear-gradient(135deg, #6366F1, #06B6D4)",
                      ][index],
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="inline-flex min-w-0 max-w-full items-start gap-2 text-sm text-muted sm:items-center">
                <BadgeCheck size={16} className="mt-0.5 shrink-0 text-emerald sm:mt-0" />
                <span>
                  Trusted by{" "}
                  <span className="font-semibold text-foreground">12,000+ creators from 40+ countries</span>
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden w-full justify-self-center md:block md:max-w-[min(420px,100%)]">
            {/* Backdrop aligned to the same max width as the deck (no extra left gap) */}
            <div className="pointer-events-none absolute inset-x-0 top-8 bottom-12 mx-auto max-w-[380px] rounded-[36px] bg-gradient-to-br from-purple/25 via-transparent to-cyan/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-10 bottom-14 mx-auto max-w-[360px] rounded-[30px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent" aria-hidden="true" />

            <motion.div
              ref={panelRef}
              className="relative mx-auto w-full max-w-[380px]"
              style={{ transform: perspective, transformStyle: "preserve-3d" }}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            >
              <div className="relative mx-auto h-[min(420px,58vh)] min-h-[360px] w-full max-w-[380px] sm:h-[440px] sm:min-h-0">
                {stackOrder.map((cardIndex, slot) => {
                  const card = stackCards[cardIndex];
                  const layout = stackLayout[slot] ?? stackLayout[0];
                  const isLead = slot === 0;
                  const isHovered = hoveredIndex === cardIndex;
                  const lift = isHovered ? -14 : 0;
                  const spread = hoveredIndex !== null && !isHovered ? -5 : 0;
                  const topPx = layout.top + spread * slot * 0.35;

                  return (
                    <motion.div
                      key={cardIndex}
                      className="absolute inset-x-0 mx-auto w-full max-w-[360px] cursor-pointer origin-center rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:max-w-[380px]"
                      role="button"
                      tabIndex={0}
                      aria-label={`${card.name}: bring to front`}
                      initial={
                        reducedMotion
                          ? false
                          : { opacity: 0, y: 28, rotate: layout.rotate * 0.5, scale: layout.scale * 0.96, filter: "blur(8px)" }
                      }
                      animate={{
                        top: topPx,
                        zIndex: isHovered ? 45 : layout.z,
                        opacity: layout.opacity,
                        y: lift,
                        rotate: layout.rotate,
                        scale: layout.scale * (isHovered ? 1.02 : 1),
                        filter: reducedMotion ? "blur(0px)" : "blur(0px)",
                      }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              top: { type: "spring", stiffness: 260, damping: 28 },
                              zIndex: { duration: 0.2 },
                              opacity: { duration: 0.5, delay: 0.15 + slot * 0.08 },
                              y: { type: "spring", stiffness: 380, damping: 28 },
                              rotate: { type: "spring", stiffness: 220, damping: 26 },
                              scale: { type: "spring", stiffness: 400, damping: 24 },
                              filter: { duration: 0.45 },
                            }
                      }
                      onMouseEnter={() => setHoveredIndex(cardIndex)}
                      onClick={() => bringToFront(cardIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          bringToFront(cardIndex);
                        }
                      }}
                    >
                      <motion.div
                        className={`relative overflow-hidden rounded-[26px] border p-4 shadow-2xl backdrop-blur-xl sm:rounded-[28px] sm:p-5 ${
                          isLead
                            ? isDark
                              ? "border-white/25 bg-[rgba(10,18,32,0.92)] shadow-[0_24px_64px_rgba(6,10,24,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                              : "border-slate-200/80 bg-white/95 shadow-[0_22px_52px_rgba(15,23,42,0.16)]"
                            : isDark
                              ? "border-white/15 bg-[rgba(8,16,28,0.82)] shadow-[0_16px_40px_rgba(6,10,24,0.45)]"
                              : "border-slate-200/70 bg-slate-50/96 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                        }`}
                        whileHover={
                          reducedMotion
                            ? undefined
                            : {
                                boxShadow: isLead
                                  ? "0 32px 80px rgba(124, 58, 237, 0.22), 0 0 0 1px rgba(255,255,255,0.12) inset"
                                  : "0 24px 56px rgba(6, 182, 212, 0.12)",
                              }
                        }
                        transition={{ duration: 0.35 }}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 ${
                            isLead ? (isDark ? "opacity-50" : "opacity-35") : isDark ? "opacity-40" : "opacity-28"
                          }`}
                          style={{ backgroundImage: card.tint }}
                          aria-hidden="true"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.12]"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                          }}
                          aria-hidden="true"
                        />
                        {!reducedMotion ? (
                          <motion.div
                            className="pointer-events-none absolute inset-0"
                            aria-hidden="true"
                            style={{
                              background:
                                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.08) 45%, transparent 90%)",
                              backgroundSize: "200% 100%",
                            }}
                            animate={{ opacity: [0.12, 0.28, 0.12], backgroundPosition: ["0% 0%", "100% 0%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        ) : null}

                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-2 sm:gap-3">
                            <span
                              className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.2em] ${
                                isDark
                                  ? "border-white/20 bg-black/25 text-cyan"
                                  : "border-slate-200/80 bg-slate-50/90 text-cyan-700"
                              }`}
                            >
                              {card.tag}
                            </span>
                            {isLead ? (
                              <span className="inline-flex max-w-[52%] rounded-full border border-amber/35 bg-amber/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-600 sm:max-w-none sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em]">
                                {card.badge}
                              </span>
                            ) : (
                              <span
                                className={`inline-flex shrink-0 rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] ${
                                  isDark
                                    ? "border-white/15 bg-black/25 text-slate-100/90"
                                    : "border-slate-200/80 bg-slate-50/90 text-slate-700"
                                }`}
                              >
                                {card.rating}
                              </span>
                            )}
                          </div>

                          <h3
                            className={`mt-2.5 font-extrabold leading-none tracking-tight text-foreground sm:mt-3 ${
                              isLead ? "text-3xl sm:text-[2.35rem]" : "text-2xl sm:text-[1.85rem]"
                            }`}
                          >
                            {card.name}
                          </h3>
                          <p
                            className={`mt-1.5 text-muted sm:mt-2 ${isLead ? "line-clamp-2 text-sm leading-relaxed" : "line-clamp-2 text-xs leading-5 sm:text-sm sm:leading-6"}`}
                          >
                            {card.metric}
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-3.5 sm:gap-3">
                            <div
                              className={`rounded-xl border px-2.5 py-2 sm:px-3 ${
                                isDark
                                  ? "border-white/10 bg-black/25"
                                  : "border-slate-200/70 bg-slate-50/90"
                              }`}
                            >
                              <p className="text-[9px] uppercase tracking-[0.14em] text-muted sm:text-[10px] sm:tracking-[0.16em]">Rating</p>
                              <p className="mt-1 text-xl font-semibold leading-none text-foreground sm:text-2xl">{card.rating}</p>
                            </div>
                            <div
                              className={`rounded-xl border px-2.5 py-2 sm:px-3 ${
                                isDark
                                  ? "border-white/10 bg-black/25"
                                  : "border-slate-200/70 bg-slate-50/90"
                              }`}
                            >
                              <p className="text-[9px] uppercase tracking-[0.14em] text-muted sm:text-[10px] sm:tracking-[0.16em]">Users</p>
                              <p className="mt-1 text-xl font-semibold leading-none text-foreground sm:text-2xl">{card.users}</p>
                            </div>
                          </div>

                          <div className="mt-3 space-y-1.5 sm:space-y-2">
                            <div
                              className={`h-1.5 overflow-hidden rounded-full sm:h-2 ${
                                isDark ? "bg-white/10" : "bg-slate-200/80"
                              }`}
                            >
                              <motion.div
                                initial={reducedMotion ? false : { width: 0 }}
                                animate={{ width: `${card.momentum}%` }}
                                transition={
                                  reducedMotion ? undefined : { duration: 1, delay: 0.5 + slot * 0.12, ease: [0.22, 1, 0.36, 1] }
                                }
                                className="h-full rounded-full bg-gradient-to-r from-purple to-cyan"
                              />
                            </div>
                            {isLead ? (
                              <div
                                className={`h-1.5 overflow-hidden rounded-full sm:h-2 ${
                                  isDark ? "bg-white/10" : "bg-slate-200/80"
                                }`}
                              >
                                <motion.div
                                  initial={reducedMotion ? false : { width: 0 }}
                                  animate={{ width: `${card.confidence}%` }}
                                  transition={
                                    reducedMotion ? undefined : { duration: 1, delay: 0.62 + slot * 0.12, ease: [0.22, 1, 0.36, 1] }
                                  }
                                  className="h-full rounded-full bg-gradient-to-r from-blue to-cyan"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10 sm:rounded-[28px]" aria-hidden="true" />
                        <div
                          className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.14),transparent_50%)] sm:rounded-[28px]"
                          aria-hidden="true"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                className="pointer-events-none absolute -bottom-2 left-1/2 -z-10 h-24 w-[78%] -translate-x-1/2 rounded-[999px] bg-gradient-to-r from-purple/40 via-cyan/25 to-purple/30 blur-3xl"
                animate={reducedMotion ? undefined : { opacity: [0.35, 0.6, 0.35], scale: [1, 1.03, 1] }}
                transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
