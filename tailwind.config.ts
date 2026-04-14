import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Safelist ensures Ocean Trust token classes are never purged by JIT,
  // even when used dynamically (e.g. className={`bg-${color}`}).
  safelist: [
    { pattern: /^(bg|text|border|ring|fill|stroke|from|to|via)-(surface|accent|fg|line|warning|error|info|success|tier)(-|$)/ },
  ],
  theme: {
    extend: {
      colors: {
        // All colors reference CSS custom properties defined in globals.css.
        // This means the actual values are always present in the stylesheet
        // via :root, so HMR can never cause them to disappear.
        surface: {
          primary:   "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          inverse:   "var(--surface-inverse)",
          sage:      "var(--surface-sage)",
        },
        accent: {
          primary: "var(--accent-primary)",
          light:   "var(--accent-light)",
        },
        fg: {
          primary:   "var(--fg-primary)",
          secondary: "var(--fg-secondary)",
          muted:     "var(--fg-muted)",
          inverse:   "var(--fg-inverse)",
        },
        line: {
          subtle: "var(--line-subtle)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          bg:      "var(--warning-bg)",
        },
        error: {
          DEFAULT: "var(--error)",
          bg:      "var(--error-bg)",
        },
        info: {
          DEFAULT: "var(--info)",
          bg:      "var(--info-bg)",
        },
        success: {
          DEFAULT: "var(--success)",
          bg:      "var(--success-bg)",
        },
        tier: {
          gold:   "var(--tier-gold)",
          silver: "var(--tier-silver)",
          bronze: "var(--tier-bronze)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        hero: ["52px", { lineHeight: "1.1", fontWeight: "700" }],
        "page-heading": ["44px", { lineHeight: "1.15", fontWeight: "700" }],
        "section-heading": ["30px", { lineHeight: "1.2", fontWeight: "700" }],
        "card-title": ["19px", { lineHeight: "1.3", fontWeight: "700" }],
        subtitle: ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        micro: ["11px", { lineHeight: "1.3", fontWeight: "600" }],
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.04)",
        "card-dark": "0 8px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
