import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Clock, Share2, Bookmark, Heart, ArrowRight } from "lucide-react";
import { getEventById, events } from "../../data/events";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    /* extra bottom padding on mobile to clear the sticky CTA bar */
    <div className="page-root" style={{ paddingBottom: 0 }}>
      <div className="event-detail-grid">

        {/* ── Left: Hero image ─────────────────────────────── */}
        <div className="event-detail-image" style={{ position: "relative", height: 340 }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="event-img-overlay"
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,14,0.30) 0%, rgba(10,10,14,0) 40%, rgba(10,10,14,0.80) 100%)",
            }}
          />

          {/* Back & Share */}
          <div style={{ position: "absolute", top: 52, left: 20, right: 20, display: "flex", justifyContent: "space-between" }}>
            <Link href="/" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowLeft size={18} color="#fff" strokeWidth={2} />
            </Link>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Bookmark size={18} color="#fff" strokeWidth={1.8} />
              </button>
              <button type="button" style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.60)", backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Share2 size={18} color="#fff" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Tag — mobile */}
          <div className="mobile-only" style={{
            position: "absolute", bottom: 20, left: 20,
            background: "var(--color-accent)", borderRadius: 9999,
            padding: "4px 12px", fontSize: 11, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>
            {event.tag}
          </div>
        </div>

        {/* ── Right: Details ────────────────────────────────── */}
        {/* mobile: paddingBottom clears the sticky CTA bar */}
        <div className="event-detail-scroll" style={{ paddingBottom: 108 }}>

          {/* Tag — desktop */}
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
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 20 }}>
            {event.title}
          </h1>

          {/* 2-col meta tiles — Date | Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <MetaBox icon={<Calendar size={16} color="var(--color-accent)" />} label="Date" value={event.date} />
            <MetaBox icon={<Clock    size={16} color="var(--color-accent)" />} label="Time" value={event.time} />
          </div>

          {/* Location row — full width with arrow */}
          <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-lg)", padding: "14px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-active)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <MapPin size={15} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Venue</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{event.location}</p>
              </div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: 9999,
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border-subtle)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowRight size={13} color="var(--color-text-muted)" strokeWidth={2} />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10 }}>About The Event</h2>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
              {event.description}
            </p>
          </div>

          {/* Map — real Google Maps embed */}
          <div style={{
            borderRadius: "var(--radius-xl)", overflow: "hidden",
            height: 200,
            border: "1px solid var(--color-border-subtle)",
            marginBottom: 28,
          }}>
            <iframe
              title="Event location"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location + ", " + event.city)}&output=embed&z=15`}
            />
          </div>

        </div>{/* end event-detail-scroll */}
      </div>{/* end event-detail-grid */}

      {/* ── Sticky CTA bar (mobile: fixed bottom; desktop: absolute inside scroll panel) ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        zIndex: 60,
        padding: "12px 20px 28px",
        background: "linear-gradient(to top, var(--color-bg-base) 60%, transparent 100%)",
      }}>
        <div style={{
          maxWidth: 430, margin: "0 auto",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: 20,
          padding: "12px 12px 12px 16px",
          display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 -4px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--color-border-subtle)",
        }}>
          {/* Heart / save button */}
          <button type="button" style={{
            width: 50, height: 50, borderRadius: 14,
            background: "var(--color-bg-card)",
            border: "1.5px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
            transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <Heart size={20} color="var(--color-accent)" strokeWidth={2} />
          </button>

          {/* Price */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 1 }}>Starts From</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {event.price}
            </p>
          </div>

          {/* Book Now */}
          <Link
            href={`/checkout/${event.id}`}
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              borderRadius: 14,
              padding: "0 28px",
              height: 50,
              fontSize: 15, fontWeight: 800,
              textDecoration: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 24px rgba(242,107,58,0.45)",
              letterSpacing: "-0.01em",
            }}
          >
            Book Now
          </Link>
        </div>
      </div>

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
      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{value}</p>
    </div>
  );
}

