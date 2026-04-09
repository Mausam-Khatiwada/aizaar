"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Tool } from "@/lib/tools";

function compareValue(left: Tool, right: Tool, metric: "price" | "rating" | "ease") {
  if (metric === "price") {
    const parsePrice = (value: string) => {
      const match = value.match(/(\d+(\.\d+)?)/);
      return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
    };
    const leftPrice = parsePrice(left.pricing.startingPrice);
    const rightPrice = parsePrice(right.pricing.startingPrice);
    return leftPrice <= rightPrice ? "left" : "right";
  }
  if (metric === "ease") {
    return left.rating.easeOfUse >= right.rating.easeOfUse ? "left" : "right";
  }
  return left.rating.overall >= right.rating.overall ? "left" : "right";
}

export function QuickComparisonWidget({ tools }: { tools: Tool[] }) {
  const initial = tools.slice(0, 8);
  const [leftSlug, setLeftSlug] = useState(initial[0]?.id ?? "");
  const [rightSlug, setRightSlug] = useState(initial[1]?.id ?? "");

  const leftTool = useMemo(() => tools.find((tool) => tool.id === leftSlug), [leftSlug, tools]);
  const rightTool = useMemo(() => tools.find((tool) => tool.id === rightSlug), [rightSlug, tools]);

  if (!leftTool || !rightTool) {
    return null;
  }

  return (
    <section className="section-shell pt-0">
      <div className="glass-card max-w-full min-w-0 rounded-[34px] p-5 sm:p-8">
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">Not sure which one to choose?</h2>
        <p className="mt-3 text-muted">Compare two tools instantly and jump to the full head-to-head breakdown.</p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted">
            <span>Compare</span>
            <select
              value={leftSlug}
              onChange={(event) => setLeftSlug(event.target.value)}
              className="surface-select min-h-12 rounded-2xl px-4 text-foreground outline-none"
            >
              {initial.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-muted">
            <span>vs</span>
            <select
              value={rightSlug}
              onChange={(event) => setRightSlug(event.target.value)}
              className="surface-select min-h-12 rounded-2xl px-4 text-foreground outline-none"
            >
              {initial.map((tool) => (
                <option key={tool.id} value={tool.id}>
                  {tool.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="table-scroll hide-scrollbar -mx-1 mt-6 px-1 sm:mx-0 sm:px-0">
          <table className="premium-table min-w-[520px] sm:min-w-[620px]">
            <thead>
              <tr>
                <th>Metric</th>
                <th>{leftTool.name}</th>
                <th>{rightTool.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-foreground">Price</td>
                <td className={compareValue(leftTool, rightTool, "price") === "left" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {leftTool.pricing.startingPrice}
                </td>
                <td className={compareValue(leftTool, rightTool, "price") === "right" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {rightTool.pricing.startingPrice}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Rating</td>
                <td className={compareValue(leftTool, rightTool, "rating") === "left" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {leftTool.rating.overall.toFixed(1)}
                </td>
                <td className={compareValue(leftTool, rightTool, "rating") === "right" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {rightTool.rating.overall.toFixed(1)}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Free plan</td>
                <td>{leftTool.pricing.hasFree ? "Yes" : "No"}</td>
                <td>{rightTool.pricing.hasFree ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Best for</td>
                <td>{leftTool.bestFor}</td>
                <td>{rightTool.bestFor}</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Ease of use</td>
                <td className={compareValue(leftTool, rightTool, "ease") === "left" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {leftTool.rating.easeOfUse.toFixed(1)}
                </td>
                <td className={compareValue(leftTool, rightTool, "ease") === "right" ? "bg-emerald/10 text-foreground" : "text-muted"}>
                  {rightTool.rating.easeOfUse.toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link
          href={`/compare?tools=${leftTool.id},${rightTool.id}`}
          className="button-primary button-glow mt-6 inline-flex w-full justify-center sm:w-auto"
        >
          See Full Comparison
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
