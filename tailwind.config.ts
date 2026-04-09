import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./data/**/*.{json,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        "border-bright": "var(--border-bright)",
        purple: "var(--purple)",
        cyan: "var(--cyan)",
        emerald: "var(--emerald)",
        amber: "var(--amber)",
        rose: "var(--rose)",
        blue: "var(--blue)",
        foreground: "var(--text-primary)",
        muted: "var(--text-secondary)",
        subtle: "var(--text-muted)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 20px 80px rgba(8, 11, 20, 0.35)",
        purple: "0 0 40px rgba(124, 58, 237, 0.3)",
        cyan: "0 0 40px rgba(6, 182, 212, 0.3)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, rgba(124, 58, 237, 1), rgba(6, 182, 212, 1))",
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        mesh: "mesh 16s ease-in-out infinite alternate",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        mesh: {
          "0%": {
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "100%": {
            transform: "translate3d(2%, -4%, 0) scale(1.06)",
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--text-secondary)",
            maxWidth: "none",
            a: {
              color: "var(--cyan)",
              textDecoration: "none",
            },
            h1: { color: "var(--text-primary)", fontFamily: "var(--font-heading)" },
            h2: { color: "var(--text-primary)", fontFamily: "var(--font-heading)" },
            h3: { color: "var(--text-primary)", fontFamily: "var(--font-heading)" },
            strong: { color: "var(--text-primary)" },
            code: { color: "var(--text-primary)" },
            blockquote: {
              color: "var(--text-primary)",
              borderLeftColor: "rgba(124, 58, 237, 0.45)",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
