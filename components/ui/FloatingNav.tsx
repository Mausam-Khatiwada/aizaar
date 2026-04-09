"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { FolderKanban, Heart, Home, Menu, Search } from "lucide-react";

import { useAppShell } from "@/components/providers/AppProviders";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const pathname = usePathname();
  const { openSearch, searchOpen, openMobileNav, mobileNavOpen, savedIds, theme } = useAppShell();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div
        className="pointer-events-auto mx-auto box-border w-full max-w-[430px] px-1 pb-[calc(env(safe-area-inset-bottom)+8px)] min-[375px]:px-1.5"
        style={{
          paddingLeft: "max(env(safe-area-inset-left), 4px)",
          paddingRight: "max(env(safe-area-inset-right), 4px)",
        }}
      >
        <div className="floating-dock-surface w-full overflow-hidden rounded-[20px] px-1 pb-1.5 pt-1 backdrop-blur-2xl max-[359px]:rounded-[18px] min-[375px]:rounded-[22px]">
          <div className="grid grid-cols-5 items-stretch gap-0 min-[375px]:gap-0.5">
            <DockItem active={pathname === "/"} href="/" label="Home" icon={Home} theme={theme} />
            <DockAction onClick={openSearch} label="Search" icon={Search} active={searchOpen} theme={theme} />
            <DockItem active={pathname.startsWith("/categories")} href="/categories" label="Cats" icon={FolderKanban} theme={theme} />
            <DockItem active={pathname.startsWith("/saved")} href="/saved" label="Saved" icon={Heart} badge={savedIds.length} theme={theme} />
            <DockAction onClick={openMobileNav} label="Menu" icon={Menu} active={mobileNavOpen} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DockItem({
  active,
  href,
  label,
  icon: Icon,
  badge,
  theme,
}: {
  active: boolean;
  href: string;
  label: string;
  icon: typeof Home;
  badge?: number;
  theme: "dark" | "light";
}) {
  return (
    <Link href={href} className="relative block w-full min-w-0 overflow-hidden">
      <DockVisual active={active} label={label} icon={Icon} badge={badge} theme={theme} />
    </Link>
  );
}

function DockAction({
  onClick,
  label,
  icon: Icon,
  active = false,
  theme,
}: {
  onClick: () => void;
  label: string;
  icon: typeof Home;
  active?: boolean;
  theme: "dark" | "light";
}) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="relative block w-full min-w-0 overflow-hidden">
      <DockVisual active={active} label={label} icon={Icon} theme={theme} />
    </button>
  );
}

function DockVisual({
  active,
  label,
  icon: Icon,
  badge,
  theme,
}: {
  active: boolean;
  label: string;
  icon: typeof Home;
  badge?: number;
  theme: "dark" | "light";
}) {
  return (
    <>
      <motion.div
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        animate={{ scale: active ? 1.06 : 1 }}
        className={cn(
          "relative flex w-full min-h-[48px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-[16px] px-0 py-1 text-[10px] font-medium max-[359px]:min-h-[46px] max-[359px]:py-0.5 min-[375px]:min-h-[52px] min-[375px]:rounded-[18px] min-[375px]:py-1.5",
          active ? "text-foreground" : "text-muted",
        )}
      >
        <Icon size={16} className={cn("h-4 w-4 min-[375px]:h-[17px] min-[375px]:w-[17px]", active ? "scale-110" : "")} />
        <span
          className={cn(
            // Hide labels on the very smallest screens, show from ~360px up
            "hidden w-full min-w-0 max-w-[42px] truncate text-center text-[7px] leading-none transition-all min-[360px]:inline-block min-[360px]:max-w-[46px] min-[360px]:text-[8px] min-[375px]:max-w-[48px] min-[375px]:text-[9px]",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          {label}
        </span>
      </motion.div>
      {active ? (
        <motion.span
          layoutId="dock-active"
          className={cn(
            "absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r",
            theme === "dark" ? "from-purple/35 to-cyan/35" : "from-purple/22 to-cyan/22",
          )}
        />
      ) : null}
      {active ? (
        <motion.span
          layoutId="dock-dot"
          className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan min-[375px]:h-1.5 min-[375px]:w-1.5"
        />
      ) : null}
      {badge ? (
        <span className="absolute right-0.5 top-0.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-background bg-cyan px-0.5 text-[7px] font-bold leading-none text-background min-[375px]:h-4 min-[375px]:min-w-4 min-[375px]:px-1 min-[375px]:text-[8px]">
          {badge > 99 ? "99" : badge}
        </span>
      ) : null}
    </>
  );
}
