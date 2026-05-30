"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Compass, Ticket, Bookmark, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

const navLinks = [
  { href: "/explore",  label: "Explore",  Icon: Compass  },
  { href: "/tickets",  label: "Tickets",  Icon: Ticket   },
  { href: "/saved",    label: "Saved",    Icon: Bookmark },
];

export default function DesktopNav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const [query, setQuery] = useState("");
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const initials = user ? user.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() : null;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
  }

  const isLight = theme === "light";

  return (
    <header
      className="desktop-only"
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 64,
        background: "var(--color-nav-bg, rgba(10,10,14,0.92))",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid var(--color-border-subtle)",
        zIndex: 100,
        alignItems: "center",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 48px",
        height: "100%", display: "flex", alignItems: "center", gap: 0,
      }}>

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 9,
          textDecoration: "none", flexShrink: 0, marginRight: 40,
        }}>
          <img
            src="/logo.png"
            alt="Get Out"
            style={{ height: 30, width: "auto", display: "block" }}
          />
          <span style={{
            fontSize: 16, fontWeight: 800,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
          }}>Get Out</span>
        </Link>

        {/* ── Nav links ─────────────────────────────────────── */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, marginRight: "auto" }}>
          {navLinks.map(({ href, label, Icon }) => {
            const active = pathname === href || (pathname.startsWith(href + "/") && href !== "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "7px 14px",
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                  background: active ? "var(--color-accent-dim)" : "transparent",
                  border: active ? "1px solid var(--color-border-active)" : "1px solid transparent",
                  transition: "all 150ms ease",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={2.2}
                  color={active ? "var(--color-accent)" : "var(--color-text-muted)"}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Search bar ────────────────────────────────────── */}
        <form onSubmit={handleSearch} style={{ position: "relative", marginRight: 20 }}>
          <div style={{
            position: "absolute", left: 13, top: "50%",
            transform: "translateY(-50%)", pointerEvents: "none",
          }}>
            <Search size={14} color="var(--color-text-muted)" strokeWidth={2} />
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search events…"
            style={{
              width: 220,
              height: 36,
              background: "var(--color-search-input-bg, rgba(255,255,255,0.05))",
              border: "1px solid var(--color-border)",
              borderRadius: 9999,
              padding: "0 14px 0 36px",
              fontSize: 13,
              color: "var(--color-text-primary)",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 150ms ease, background 150ms ease",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = "var(--color-border-active)";
              e.currentTarget.style.background  = "var(--color-bg-card-hover)";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.background  = "var(--color-search-input-bg, rgba(255,255,255,0.05))";
            }}
          />
        </form>

        {/* ── Theme toggle ──────────────────────────────────── */}
        <button
          type="button"
          onClick={() => { toggle(); }}
          title={isLight ? "Switch to dark mode" : "Switch to light mode"}
          style={{
            width: 36, height: 36, borderRadius: 9999,
            background: "var(--color-accent-dim)",
            border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", marginRight: 16, flexShrink: 0,
            transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <span className="theme-toggle-icon">
            {isLight
              ? <Moon size={15} color="var(--color-text-secondary)" strokeWidth={2} />
              : <Sun  size={15} color="var(--color-text-secondary)" strokeWidth={2} />
            }
          </span>
        </button>

        {/* ── Divider ───────────────────────────────────────── */}
        <div style={{ width: 1, height: 22, background: "var(--color-border)", marginRight: 20 }} />

        {/* ── Profile avatar ────────────────────────────────── */}
        <Link href={user ? "/profile" : "/sign-in"} style={{
          width: 34, height: 34, borderRadius: 9999,
          background: user ? "linear-gradient(135deg, #F26B3A, #FF8A5C)" : "var(--color-accent-dim)",
          border: user ? "2px solid rgba(242,107,58,0.40)" : "1px solid var(--color-border-active)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: user ? "#fff" : "var(--color-accent)",
          textDecoration: "none", flexShrink: 0,
          boxShadow: user ? "0 0 14px rgba(242,107,58,0.30)" : "none",
        }}>{user ? initials : "?"}</Link>

      </div>
    </header>
  );
}
