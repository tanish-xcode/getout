import Link from "next/link";
import { Ticket, Heart, Settings, ChevronRight, MapPin, Star, Bell } from "lucide-react";
import { events } from "../data/events";

const stats = [
  { label: "Events", value: "12" },
  { label: "Saved",  value: "3" },
  { label: "Cities", value: "4" },
];

const menuItems = [
  { icon: Ticket,   label: "My Tickets",        href: "/tickets",  desc: "View all your bookings" },
  { icon: Heart,    label: "Saved Events",       href: "/saved",    desc: "Events you love" },
  { icon: Bell,     label: "Notifications",      href: "#",         desc: "Manage your alerts" },
  { icon: MapPin,   label: "Location Settings",  href: "#",         desc: "Hyderabad, India" },
  { icon: Star,     label: "Rate the App",       href: "#",         desc: "Leave us a review" },
  { icon: Settings, label: "Settings",           href: "#",         desc: "Account & preferences" },
];

export default function ProfilePage() {
  return (
    <div className="page-root"><div className="page-narrow" style={{ padding: "52px 20px 0" }}>
      {/* Avatar + name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 80, height: 80, borderRadius: 9999,
            background: "linear-gradient(135deg, #F26B3A, #FF8A5C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 800, color: "#fff",
            border: "3px solid var(--color-border)",
            marginBottom: 14,
            boxShadow: "0 0 32px rgba(242,107,58,0.30)",
          }}
        >
          T
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Tanish Reddy</h1>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>tanish@getout.app</p>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        {stats.map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              padding: "18px 10px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{value}</p>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Recent ticket preview */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Recent Ticket
        </p>
        <Link
          href="/tickets"
          style={{
            display: "flex", gap: 14,
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden", textDecoration: "none",
          }}
        >
          <img src={events[0]!.image} alt="" style={{ width: 80, height: 80, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ padding: "12px 14px 12px 0", flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>{events[0]!.title}</p>
            <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{events[0]!.date} · {events[0]!.city}</p>
            <span style={{ display: "inline-block", marginTop: 6, background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)", borderRadius: 9999, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "var(--color-accent)" }}>
              Confirmed
            </span>
          </div>
        </Link>
      </div>

      {/* Menu items */}
      <div
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
      >
        {menuItems.map(({ icon: Icon, label, href, desc }, i) => (
          <Link
            key={label}
            href={href}
            style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px",
              borderBottom: i < menuItems.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
              textDecoration: "none",
              transition: "background 150ms ease",
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-active)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <Icon size={17} color="var(--color-accent)" strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{label}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>{desc}</p>
            </div>
            <ChevronRight size={16} color="var(--color-text-muted)" strokeWidth={2} />
          </Link>
        ))}
      </div>

      {/* App name footer */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 600 }}>Get Out · v1.0.0</p>
        <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4 }}>Made with 🧡 for event lovers</p>
      </div>
    </div></div>
  );
}
