"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";

export function ShareButton({ url }: { url: string }) {
  const { notify } = useAppShell();
  const [copied, setCopied] = useState(false);

  async function onShare() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      notify("Link copied to clipboard", "success");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify("Could not copy link", "warning");
    }
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="button-secondary min-h-11 w-full border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.08] sm:w-auto"
    >
      <Share2 size={16} />
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
