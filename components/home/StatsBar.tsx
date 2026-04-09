"use client";

import { useEffect, useRef, useState } from "react";
import { FolderKanban, Grid2X2, RefreshCw, Star } from "lucide-react";

const stats = [
  { label: "AI Tools Reviewed", value: 132, suffix: "+", icon: Grid2X2, glowClass: "shadow-purple" },
  { label: "Categories Covered", value: 15, suffix: "", icon: FolderKanban, glowClass: "shadow-cyan" },
  { label: "Avg Tool Rating", value: 48, suffix: "x", icon: Star, glowClass: "shadow-[0_0_38px_rgba(245,158,11,0.32)]" },
  { label: "Update Frequency", value: 1, suffix: "x", icon: RefreshCw, glowClass: "shadow-[0_0_38px_rgba(16,185,129,0.35)]" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValues(stats.map((stat) => Math.round(stat.value * progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <section ref={ref} className="border-b border-white/10">
      <div className="section-shell py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`glass-card rounded-[26px] p-6 ${stat.glowClass}`}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <stat.icon size={20} className="text-cyan" />
              </div>
              <div className="text-4xl font-extrabold text-foreground">
                {stat.label === "Avg Tool Rating"
                  ? `${(values[index] / 10).toFixed(1)}★`
                  : stat.label === "Update Frequency"
                    ? "Weekly"
                    : `${values[index]}${stat.suffix === "x" ? "" : stat.suffix}`}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
