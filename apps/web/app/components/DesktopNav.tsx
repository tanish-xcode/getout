"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Compass, Ticket, Bookmark, User } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/explore",  label: "Explore",  Icon: Compass  },
  { href: "/tickets",  label: "Tickets",  Icon: Ticket   },
  { href: "/saved",    label: "Saved",    Icon: Bookmark },
];

export default function DesktopNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header
      className="desktop-only"
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 64,
        background: "rgba(10,10,14,0.92)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
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
          display: "flex", alignItems: "center", gap: 10,
          textDecoration: "none", flexShrink: 0, marginRight: 40,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "#fff",
            boxShadow: "0 0 20px rgba(242,107,58,0.50)",
          }}>G</div>
          <span style={{
            fontSize: 16, fontWeight: 800, color: "#fff",
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
                  color: active ? "#fff" : "var(--color-text-secondary)",
                  background: active ? "rgba(242,107,58,0.14)" : "transparent",
                  border: active ? "1px solid rgba(242,107,58,0.28)" : "1px solid transparent",
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 9999,
              padding: "0 14px 0 36px",
              fontSize: 13,
              color: "#fff",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 150ms ease, background 150ms ease",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = "rgba(242,107,58,0.45)";
              e.currentTarget.style.background  = "rgba(255,255,255,0.07)";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.background  = "rgba(255,255,255,0.05)";
            }}
          />
        </form>

        {/* ── Divider ───────────────────────────────────────── */}
        <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.10)", marginRight: 20 }} />

        {/* ── Profile avatar ────────────────────────────────── */}
        <Link href="/profile" style={{
          width: 34, height: 34, borderRadius: 9999,
          background: "linear-gradient(135deg, #F26B3A, #FF8A5C)",
          border: "2px solid rgba(242,107,58,0.40)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: "#fff",
          textDecoration: "none", flexShrink: 0,
          boxShadow: "0 0 14px rgba(242,107,58,0.30)",
        }}>T</Link>

      </div>
    </header>
  );
}
