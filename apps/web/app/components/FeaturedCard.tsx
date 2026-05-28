import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import type { Event } from "../data/events";

export default function FeaturedCard({ id, title, subtitle, location, date, price, image, attendees = 1200 }: Event) {
  return (
    <div
      className="featured-card pressable"
      style={{
        position: "relative",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        width: "100%",
        height: 360,
        boxShadow: "var(--shadow-card)",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,14,0) 0%, rgba(10,10,14,0.55) 40%, rgba(10,10,14,0.97) 100%)",
        }}
      />

      {/* Attendees top-left */}
      <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <AvatarStack count={4} />
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 600,
            background: "rgba(10,10,14,0.50)",
            backdropFilter: "blur(6px)",
            padding: "3px 10px",
            borderRadius: 9999,
          }}
        >
          {attendees.toLocaleString()}+ attending
        </span>
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
        {subtitle && (
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            {subtitle}
          </p>
        )}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.02em" }}>
          {title}
        </h2>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <MetaChip icon={<Calendar size={12} />} text={date} />
          <MetaChip icon={<MapPin size={12} />} text={location.split(",")[0]!} />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 10, color: "var(--color-text-secondary)", fontWeight: 500, marginBottom: 2 }}>Starting from</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{price}</p>
          </div>
          <Link
            href={`/events/${id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-accent)",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              padding: "13px 22px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(242,107,58,0.45)",
              textDecoration: "none",
            }}
          >
            Get Tickets <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetaChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(6px)",
        borderRadius: 9999,
        padding: "5px 10px",
        color: "rgba(255,255,255,0.90)",
      }}
    >
      {icon}
      <span style={{ fontSize: 12, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

function AvatarStack({ count }: { count: number }) {
  const colors = ["#6366F1", "#F26B3A", "#22C55E", "#EC4899"];
  return (
    <div className="avatar-stack">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 26,
            height: 26,
            borderRadius: 9999,
            background: colors[i % colors.length],
            border: "2px solid rgba(10,10,14,0.80)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
