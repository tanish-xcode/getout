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
    <nav className="bottom-nav">
      {navItems.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            style={{
              width: 52,
              height: 52,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isActive ? "var(--color-accent)" : "transparent",
              color: isActive ? "#fff" : "var(--color-text-muted)",
              boxShadow: isActive ? "0 0 16px rgba(242,107,58,0.45)" : "none",
              transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)",
              flexShrink: 0,
              textDecoration: "none",
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
          </Link>
        );
      })}
    </nav>
  );
}
