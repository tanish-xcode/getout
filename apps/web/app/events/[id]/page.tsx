import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Clock, Users, Share2, Bookmark } from "lucide-react";
import { getEventById, events } from "../../data/events";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <div className="page-root" style={{ paddingBottom: 0 }}>
      <div className="event-detail-grid">

        {/* ── Left: Hero image ─────────────────────────────── */}
        <div className="event-detail-image" style={{ position: "relative", height: 340 }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Gradient */}
          <div
            className="event-img-overlay"
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,14,0.30) 0%, rgba(10,10,14,0) 40%, rgba(10,10,14,0.80) 100%)",
            }}
          />

          {/* Back & Share buttons */}
          <div style={{ position: "absolute", top: 52, left: 20, right: 20, display: "flex", justifyContent: "space-between" }}>
            <Link
              href="/"
              style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ArrowLeft size={18} color="#fff" strokeWidth={2} />
            </Link>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Bookmark size={18} color="#fff" strokeWidth={1.8} />
              </button>
              <button style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Share2 size={18} color="#fff" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Tag (mobile: on image; desktop: hidden here, shown in details) */}
          <div className="mobile-only" style={{
            position: "absolute", bottom: 20, left: 20,
            background: "var(--color-accent)", borderRadius: 9999,
            padding: "4px 12px", fontSize: 11, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            {event.tag}
          </div>
        </div>

        {/* ── Right: Details + Buy ──────────────────────────── */}
        <div className="event-detail-scroll">

          {/* Tag (desktop-only, at top of details panel) */}
          <div className="desktop-only" style={{
            marginBottom: 16,
            background: "var(--color-accent)", borderRadius: 9999,
            padding: "4px 14px", fontSize: 11, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em",
            width: "fit-content",
          }}>
            {event.tag}
          </div>

          <p style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 6 }}>
            {event.organizer}
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 20 }}>
            {event.title}
          </h1>

          {/* Meta grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <MetaBox icon={<Calendar size={16} color="var(--color-accent)" />} label="Date"      value={event.date} />
            <MetaBox icon={<Clock    size={16} color="var(--color-accent)" />} label="Time"      value={event.time} />
            <MetaBox icon={<MapPin   size={16} color="var(--color-accent)" />} label="Venue"     value={event.location.split(",")[0]!} />
            <MetaBox icon={<Users    size={16} color="var(--color-accent)" />} label="Attending" value={`${event.attendees.toLocaleString()}+`} />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>About The Event</h2>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
              {event.description}
            </p>
          </div>

          {/* Attendees strip */}
          <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-xl)",
            padding: "14px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AvatarStack count={4} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{event.attendees.toLocaleString()}+ attending</p>
                <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Be part of this event</p>
              </div>
            </div>
            <MapPin size={20} color="var(--color-accent)" strokeWidth={2} />
          </div>

          {/* Map placeholder */}
          <div style={{
            borderRadius: "var(--radius-xl)", overflow: "hidden",
            height: 140,
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 28, position: "relative",
          }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 20}%`, height: 1, background: "var(--color-text-secondary)" }} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 20}%`, width: 1, background: "var(--color-text-secondary)" }} />
              ))}
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: 9999,
              background: "var(--color-accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 0 8px rgba(242,107,58,0.20)", zIndex: 1,
            }}>
              <MapPin size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <div style={{
              position: "absolute", bottom: 12, left: 16,
              background: "var(--color-bg-card)", border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)", padding: "6px 12px",
              fontSize: 12, fontWeight: 600, color: "#fff",
            }}>
              {event.location}
            </div>
          </div>

          {/* ── Buy bar ────────────────────────────────────── */}
          <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>Starting from</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{event.price}</p>
            </div>
            <Link
              href={`/checkout/${event.id}`}
              style={{
                background: "var(--color-accent)", color: "#fff",
                borderRadius: 9999, padding: "14px 32px",
                fontSize: 15, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 0 24px rgba(242,107,58,0.40)",
              }}
            >
              Buy Ticket
            </Link>
          </div>

        </div>{/* end event-detail-scroll */}
      </div>{/* end event-detail-grid */}
    </div>
  );
}

function MetaBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      background: "var(--color-bg-surface)",
      border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg)", padding: "14px",
    }}>
      <div style={{ marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</p>
    </div>
  );
}

function AvatarStack({ count }: { count: number }) {
  const colors = ["#6366F1", "#F26B3A", "#22C55E", "#EC4899"];
  return (
    <div className="avatar-stack">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 28, height: 28, borderRadius: 9999,
          background: colors[i % colors.length],
          border: "2px solid var(--color-bg-surface)", flexShrink: 0,
        }} />
      ))}
    </div>
  );
}
