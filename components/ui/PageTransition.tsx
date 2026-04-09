"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PageTransition({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  const reducedMotion = useReducedMotion();
  const resolvedClassName = className ? `w-full min-w-0 ${className}` : "w-full min-w-0";

  return (
    <motion.div
      initial={false}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reducedMotion ? undefined : { duration: 0.35, ease: "easeOut" }}
      style={{ opacity: 1, transform: "translateY(0px)" }}
      className={resolvedClassName}
    >
      {children}
    </motion.div>
  );
}
