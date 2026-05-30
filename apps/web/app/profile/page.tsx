"use client";
import Link from "next/link";
import { Ticket, Heart, Settings, ChevronRight, MapPin, Star, Bell, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Ticket,   label: "My Tickets",        href: "/tickets",  desc: "View all your bookings" },
  { icon: Heart,    label: "Saved Events",       href: "/saved",    desc: "Events you love" },
  { icon: Bell,     label: "Notifications",      href: "#",         desc: "Manage your alerts" },
  { icon: MapPin,   label: "Location Settings",  href: "#",         desc: "Hyderabad, India" },
  { icon: Star,     label: "Rate the App",       href: "#",         desc: "Leave us a review" },
  { icon: Settings, label: "Settings",           href: "#",         desc: "Account & preferences" },
];

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  // ── Not logged in ────────────────────────────────────────────
  if (!user) {
    return (
      <div className="page-root"><div className="page-narrow" style={{ padding: "52px 20px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 0" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, marginBottom: 16,
          }}>
            👤
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", marginBottom: 8 }}>
            You&apos;re not signed in
          </h1>
          <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 32, textAlign: "center", lineHeight: 1.5 }}>
            Sign in to manage your tickets, saved events, and preferences.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <Link href="/sign-in" style={{
              height: 52, borderRadius: 16, background: "var(--color-accent)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 15, fontWeight: 800, color: "#fff", textDecoration: "none",
              boxShadow: "0 0 28px rgba(242,107,58,0.40)",
            }}>
              <LogIn size={18} strokeWidth={2} /> Sign In
            </Link>
            <Link href="/sign-up" style={{
              height: 52, borderRadius: 16,
              background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", textDecoration: "none",
            }}>
              <UserPlus size={18} strokeWidth={2} /> Create Account
            </Link>
          </div>
        </div>
      </div></div>
    );
  }

  // ── Logged in ────────────────────────────────────────────────
  return (
    <div className="page-root"><div className="page-narrow" style={{ padding: "52px 20px 0" }}>
      {/* Avatar + name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 9999,
          background: "linear-gradient(135deg, #F26B3A, #FF8A5C)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 800, color: "#fff",
          border: "3px solid var(--color-border)",
          marginBottom: 14,
          boxShadow: "0 0 32px rgba(242,107,58,0.30)",
        }}>
          {getInitials(user.name)}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", marginBottom: 4 }}>
          {user.name}
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{user.email}</p>
      </div>

      {/* Menu items */}
      <div style={{
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        marginBottom: 20,
      }}>
        {menuItems.map(({ icon: Icon, label, href, desc }, i) => (
          <Link key={label} href={href} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "16px",
            borderBottom: i < menuItems.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
            textDecoration: "none",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "var(--color-accent-dim)",
              border: "1px solid var(--color-border-active)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon size={17} color="var(--color-accent)" strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>{label}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>{desc}</p>
            </div>
            <ChevronRight size={16} color="var(--color-text-muted)" strokeWidth={2} />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        style={{
          width: "100%", height: 50, borderRadius: 14,
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontSize: 14, fontWeight: 700, color: "#F87171",
          cursor: "pointer", fontFamily: "inherit",
          marginBottom: 24,
        }}
      >
        <LogOut size={16} strokeWidth={2} color="#F87171" />
        Sign Out
      </button>

      {/* Footer */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 600 }}>Get Out · v1.0.0</p>
        <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4 }}>Made with 🧡 for event lovers</p>
      </div>
    </div></div>
  );
}
