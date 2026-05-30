"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {
    if (typeof window !== "undefined") (window as any).__goToggleTheme?.();
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Sync React state from current DOM state
    const current = (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
    setTheme(current);

    // Keep React state in sync when the global toggle fires
    function onThemeChange(e: Event) {
      setTheme((e as CustomEvent<Theme>).detail);
    }
    document.addEventListener("go-theme-change", onThemeChange);
    return () => document.removeEventListener("go-theme-change", onThemeChange);
  }, []);

  function toggle() {
    (window as any).__goToggleTheme?.();
  }

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return useContext(ThemeCtx);
}
