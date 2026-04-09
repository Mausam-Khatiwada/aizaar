"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function RouteLoadingBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setProgress(18);

    const stepA = window.setTimeout(() => setProgress(55), 90);
    const stepB = window.setTimeout(() => setProgress(82), 180);
    const stepC = window.setTimeout(() => setProgress(100), 280);
    const reset = window.setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 420);

    return () => {
      window.clearTimeout(stepA);
      window.clearTimeout(stepB);
      window.clearTimeout(stepC);
      window.clearTimeout(reset);
    };
  }, [pathname]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-purple via-cyan to-emerald"
      animate={{ scaleX: active ? progress / 100 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}
