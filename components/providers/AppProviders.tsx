"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { Tool } from "@/lib/tools";

type ThemeMode = "dark" | "light";

type AppShellContextValue = {
  tools: Tool[];
  theme: ThemeMode;
  toggleTheme: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
  savedIds: string[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  compareIds: string[];
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  removeCompare: (slug: string) => void;
  notify: (message: string, tone?: "default" | "success" | "warning") => void;
  toasts: ToastItem[];
  dismissToast: (id: string) => void;
};

type ToastItem = {
  id: string;
  message: string;
  tone: "default" | "success" | "warning";
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

const THEME_KEY = "toolverse-theme";
const SAVED_KEY = "toolverse-saved";
const COMPARE_KEY = "toolverse-compare";

export function AppProviders({
  children,
  tools,
}: PropsWithChildren<{
  tools: Tool[];
}>) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastSeed = useId().replace(/:/g, "");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      setTheme(prefersLight ? "light" : "dark");
    }

    const storedSaved = window.localStorage.getItem(SAVED_KEY);
    const storedCompare = window.localStorage.getItem(COMPARE_KEY);

    if (storedSaved) {
      try {
        setSavedIds(JSON.parse(storedSaved) as string[]);
      } catch {
        setSavedIds([]);
      }
    }

    if (storedCompare) {
      try {
        setCompareIds(JSON.parse(storedCompare) as string[]);
      } catch {
        setCompareIds([]);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const notify = useCallback((message: string, tone: "default" | "success" | "warning" = "default") => {
    const id = `${toastSeed}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, [toastSeed]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const value = useMemo<AppShellContextValue>(
    () => ({
      tools,
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      mobileNavOpen,
      openMobileNav: () => setMobileNavOpen(true),
      closeMobileNav: () => setMobileNavOpen(false),
      toggleMobileNav: () => setMobileNavOpen((current) => !current),
      savedIds,
      isSaved: (slug) => savedIds.includes(slug),
      toggleSaved: (slug) =>
        setSavedIds((current) => {
          const exists = current.includes(slug);
          if (exists) {
            notify("Tool removed from saved", "warning");
            return current.filter((item) => item !== slug);
          }
          notify("Tool saved!", "success");
          return [...current, slug];
        }),
      compareIds,
      isCompared: (slug) => compareIds.includes(slug),
      toggleCompare: (slug) =>
        setCompareIds((current) => {
          if (current.includes(slug)) {
            notify("Removed from comparison", "warning");
            return current.filter((item) => item !== slug);
          }

          if (current.length >= 3) {
            notify("Compare list full. Replaced oldest selection.", "default");
            return [...current.slice(1), slug];
          }

          notify("Added to comparison", "success");
          return [...current, slug];
        }),
      clearCompare: () => {
        setCompareIds([]);
        notify("Comparison cleared", "warning");
      },
      removeCompare: (slug) =>
        setCompareIds((current) => current.filter((item) => item !== slug)),
      notify,
      toasts,
      dismissToast,
    }),
    [compareIds, dismissToast, mobileNavOpen, notify, savedIds, searchOpen, theme, toasts, tools],
  );

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error("useAppShell must be used inside AppProviders");
  }
  return context;
}
