"use client";

import { useEffect } from "react";

export function GlowCursor() {
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) {
      return;
    }

    let frame = 0;

    const update = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      });
    };

    window.addEventListener("mousemove", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", update);
    };
  }, []);

  return null;
}
