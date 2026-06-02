"use client";
import Link from "next/link";
import { Compass, Ticket, Bookmark } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore", Icon: Compass },
  { href: "/tickets", label: "Tickets", Icon: Ticket  },
  { href: "/saved",   label: "Saved",   Icon: Bookmark },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="dc footer-inner">

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Get Out" style={{ height: 28, width: "auto", display: "block" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Get Out
            </span>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: "var(--color-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>
              An ASBL Initiative
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navLinks.map(({ href, label, Icon }) => (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600,
              color: "var(--color-text-muted)",
              textDecoration: "none",
              transition: "color 150ms ease",
            }}>
              <Icon size={13} strokeWidth={2} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500, flexShrink: 0 }}>
          © {new Date().getFullYear()} Get Out · ASBL · Hyderabad
        </p>

      </div>
    </footer>
  );
}
