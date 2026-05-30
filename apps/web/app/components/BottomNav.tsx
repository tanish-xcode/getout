"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Ticket, Heart, User } from "lucide-react";

const navItems = [
  { icon: Home,    label: "Home",    href: "/" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Ticket,  label: "Tickets", href: "/tickets" },
  { icon: Heart,   label: "Saved",   href: "/saved" },
  { icon: User,    label: "Profile", href: "/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" style={{
      alignItems: "center",
      height: 64,
      padding: "0 8px",
      bottom: 24,
    }}>
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            style={{
              width:        isActive ? 62 : 44,
              height:       isActive ? 62 : 44,
              borderRadius: 9999,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              background:   isActive
                ? "var(--color-accent)"
                : "transparent",
              color:        isActive ? "#fff" : "var(--color-text-muted)",
              boxShadow:    isActive
                ? "0 0 0 3px var(--color-bg-surface), 0 0 28px rgba(242,107,58,0.55)"
                : "none",
              transform:    isActive ? "translateY(-10px)" : "translateY(0)",
              transition:   "all 280ms cubic-bezier(0.34,1.56,0.64,1)",
              flexShrink:   0,
              textDecoration: "none",
              position:     "relative",
            }}
          >
            <Icon size={isActive ? 26 : 20} strokeWidth={isActive ? 2.5 : 1.8} />
          </Link>
        );
      })}
    </nav>
  );
}
