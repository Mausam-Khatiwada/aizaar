import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { CompareDrawer } from "@/components/tools/CompareDrawer";
import { AppProviders } from "@/components/providers/AppProviders";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlowCursor } from "@/components/ui/GlowCursor";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { RouteLoadingBar } from "@/components/ui/RouteLoadingBar";
import { SearchModal } from "@/components/ui/SearchModal";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ToastViewport } from "@/components/ui/ToastViewport";
import { getAllCategories, getAllTools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium AI Tools Directory`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    yandex: undefined,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  openGraph: {
    title: `${siteConfig.name} — Discover the Best AI Tools`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Discover the Best AI Tools`,
    description: siteConfig.description,
    creator: "@aizaar",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b14" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fc" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const tools = getAllTools();
  const categories = getAllCategories();

  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} min-h-screen w-full max-w-full overflow-x-hidden pb-32 md:pb-0`}>
        <a
          href="#main-content"
          className="sr-only-focusable fixed left-4 top-4 z-[90] rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-background"
        >
          Skip to content
        </a>

        <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
          <AppProviders tools={tools}>
            <RouteLoadingBar />
            <GlowCursor />
            <Header />
            <SearchModal />
            <CompareDrawer />
            <ToastViewport />
            <ScrollToTop />
            <main id="main-content" className="relative z-10 w-full min-h-[60vh] min-w-0">
              {children}
            </main>
            <Footer categories={categories} />
            <FloatingNav />
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
