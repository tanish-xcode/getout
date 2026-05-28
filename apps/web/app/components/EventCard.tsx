import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Event } from "../data/events";

export default function EventCard({ id, title, location, date, image, attendees = 99, tag }: Event) {
  return (
    <Link
      href={`/events/${id}`}
      className="pressable"
      style={{
        position: "relative",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        flexShrink: 0,
        width: 220,
        height: 300,
        display: "block",
        boxShadow: "var(--shadow-card)",
        textDecoration: "none",
      }}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Gradient */}
      <div className="gradient-card" style={{ position: "absolute", inset: 0 }} />

      {/* Date badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "rgba(10,10,14,0.70)",
          backdropFilter: "blur(8px)",
          borderRadius: "var(--radius)",
          padding: "4px 10px",
          fontSize: 11,
          fontWeight: 600,
          color: "#fff",
          border: "1px solid var(--color-border)",
        }}
      >
        {date.split(" ").slice(0, 2).join(" ")}
      </div>

      {/* Tag */}
      {tag && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "var(--color-accent-dim)",
            border: "1px solid var(--color-border-active)",
            borderRadius: 9999,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 700,
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {tag}
        </div>
      )}

      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <AvatarStack count={3} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.70)", fontWeight: 500 }}>
            {attendees.toLocaleString()}+ going
          </span>
        </div>

        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: 8,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, color: "rgba(255,255,255,0.65)" }}>
            <MapPin size={11} strokeWidth={2} />
            <span style={{ fontSize: 11, fontWeight: 500 }}>{location.split(",")[0]}</span>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9999,
              background: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(242,107,58,0.40)",
            }}
          >
            <ArrowUpRight size={15} color="#fff" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function AvatarStack({ count }: { count: number }) {
  const colors = ["#6366F1", "#F26B3A", "#22C55E"];
  return (
    <div className="avatar-stack">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 22,
            height: 22,
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
