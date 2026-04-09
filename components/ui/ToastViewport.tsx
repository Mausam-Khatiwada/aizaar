"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";

const toneStyles = {
  default: {
    icon: AlertCircle,
    border: "border-cyan/40",
    iconColor: "text-cyan",
  },
  success: {
    icon: CheckCircle2,
    border: "border-emerald/40",
    iconColor: "text-emerald",
  },
  warning: {
    icon: XCircle,
    border: "border-rose/40",
    iconColor: "text-rose",
  },
};

export function ToastViewport() {
  const { toasts, dismissToast } = useAppShell();

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[90] grid w-[min(94vw,360px)] gap-2 md:bottom-5">
      <AnimatePresence>
        {toasts.map((toast) => {
          const style = toneStyles[toast.tone];
          const Icon = style.icon;
          return (
            <motion.button
              key={toast.id}
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              onClick={() => dismissToast(toast.id)}
              className={`pointer-events-auto glass-card flex items-center gap-3 rounded-2xl border-l-4 px-4 py-3 text-left ${style.border}`}
            >
              <Icon size={18} className={style.iconColor} />
              <span className="text-sm text-foreground">{toast.message}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
