"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function RatingStars({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const fillLevel = rounded - index;
        const width = fillLevel >= 1 ? "100%" : fillLevel >= 0.5 ? "50%" : "0%";

        return (
          <div key={index} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="text-white/15" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="absolute inset-0 overflow-hidden"
            >
              <Star size={size} className="fill-amber text-amber" />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
