export const colors = {
  // Backgrounds
  bg: {
    base: "#0A0A0E",       // near-black, image 2 energy
    surface: "#13131A",    // elevated card bg
    card: "#1A1A24",       // card surface
    cardHover: "#20202E",  // hover state
    overlay: "rgba(10,10,14,0.85)",
  },

  // Orange accent — the warm orange from your reference image 1
  accent: {
    DEFAULT: "#F26B3A",
    light: "#FF8A5C",
    dim: "rgba(242,107,58,0.15)",
    dimStrong: "rgba(242,107,58,0.25)",
  },

  // Text
  text: {
    primary: "#FFFFFF",
    secondary: "#A8A8B8",
    muted: "#5C5C70",
    inverse: "#0A0A0E",
  },

  // Borders
  border: {
    subtle: "rgba(255,255,255,0.06)",
    DEFAULT: "rgba(255,255,255,0.10)",
    active: "rgba(242,107,58,0.50)",
  },

  // Semantic
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",

  // Gradient stops used in hero/card overlays
  gradient: {
    heroFrom: "rgba(10,10,14,0)",
    heroTo: "rgba(10,10,14,0.95)",
    orangeGlow: "rgba(242,107,58,0.35)",
    cardOverlay: "rgba(10,10,14,0.60)",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
    display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
  },

  // Fluid scale — mobile-first
  fontSize: {
    xs:   ["11px", { lineHeight: "16px", letterSpacing: "0.02em" }],
    sm:   ["13px", { lineHeight: "18px", letterSpacing: "0.01em" }],
    base: ["15px", { lineHeight: "22px", letterSpacing: "0" }],
    lg:   ["17px", { lineHeight: "24px", letterSpacing: "-0.01em" }],
    xl:   ["20px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
    "2xl":["24px", { lineHeight: "30px", letterSpacing: "-0.025em" }],
    "3xl":["30px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
    "4xl":["36px", { lineHeight: "42px", letterSpacing: "-0.035em" }],
    "5xl":["48px", { lineHeight: "52px", letterSpacing: "-0.04em" }],
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;

export const spacing = {
  // Base-4 scale
  "0.5": "2px",
  "1":   "4px",
  "2":   "8px",
  "3":   "12px",
  "4":   "16px",
  "5":   "20px",
  "6":   "24px",
  "8":   "32px",
  "10":  "40px",
  "12":  "48px",
  "16":  "64px",
  "20":  "80px",
  "24":  "96px",
} as const;

export const radius = {
  sm:   "8px",
  DEFAULT: "12px",
  md:   "14px",
  lg:   "16px",
  xl:   "20px",
  "2xl":"24px",
  full: "9999px",

  // Specific components
  card:       "20px",
  pill:       "9999px",
  navBar:     "28px",
  bottomNav:  "9999px",
  ticket:     "20px",
} as const;

export const shadows = {
  card:        "0 4px 24px rgba(0,0,0,0.40)",
  cardHover:   "0 8px 32px rgba(0,0,0,0.55)",
  accentGlow:  "0 0 32px rgba(242,107,58,0.30)",
  navBar:      "0 8px 40px rgba(0,0,0,0.60)",
  floating:    "0 16px 48px rgba(0,0,0,0.70)",
} as const;

export const animation = {
  duration: {
    fast:   "150ms",
    normal: "250ms",
    slow:   "400ms",
  },
  easing: {
    spring: "cubic-bezier(0.34,1.56,0.64,1)",
    smooth: "cubic-bezier(0.4,0,0.2,1)",
    out:    "cubic-bezier(0,0,0.2,1)",
  },
} as const;

// Component-level tokens
export const components = {
  card: {
    aspectRatio: "3/4",        // portrait event card
    aspectRatioWide: "16/9",   // landscape feature card
    minHeight: "200px",
    imageHeight: "220px",
  },
  bottomNav: {
    height: "72px",
    iconSize: "22px",
    activeIndicatorSize: "40px",
  },
  filterPill: {
    height: "36px",
    paddingX: "16px",
  },
  button: {
    heightSm: "40px",
    heightMd: "48px",
    heightLg: "56px",
  },
  avatar: {
    sm: "28px",
    md: "36px",
    lg: "48px",
    overlap: "-10px",
  },
  ticket: {
    dashGap: "8px",
    dashWidth: "2px",
  },
} as const;
