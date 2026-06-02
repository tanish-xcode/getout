import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Clock, Share2, Bookmark, Heart, ArrowRight, Users, Ticket, Layers } from "lucide-react";
import { getEventById, events } from "../../data/events";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  const subtitleChips = event.subtitle.split(" · ");
  const firstPeriod   = event.description.indexOf(". ");
  const pullQuote     = firstPeriod !== -1 ? event.description.slice(0, firstPeriod + 1) : "";
  const bodyText      = firstPeriod !== -1 ? event.description.slice(firstPeriod + 2) : event.description;

  return (
    <div className="page-root" style={{ paddingBottom: 0, paddingTop: 0, minHeight: "unset" }}>
      <div className="event-detail-grid">

        {/* ── Full-width banner image ───────────────────────────── */}
        <div className="event-detail-image" style={{ position: "relative", height: "56vh" }}>
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
          />

          {/* Gradient overlay */}
          <div className="event-img-overlay" style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,14,0.40) 0%, rgba(10,10,14,0) 40%, rgba(10,10,14,0.55) 100%)",
          }} />

          {/* Back & action buttons */}
          <div style={{ position: "absolute", top: 52, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
            <Link href="/" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowLeft size={18} color="#fff" strokeWidth={2} />
            </Link>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Bookmark size={18} color="#fff" strokeWidth={1.8} />
              </button>
              <button type="button" style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <Share2 size={18} color="#fff" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Tag chip — bottom-left of image */}
          <div style={{
            position: "absolute", bottom: 20, left: 20, zIndex: 2,
            background: "var(--color-accent)", borderRadius: 9999,
            padding: "4px 14px", fontSize: 10, fontWeight: 700,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em",
          }}>
            {event.tag}
          </div>
        </div>

        {/* ── All details, scrolling naturally below the image ─── */}
        <div className="event-detail-scroll" style={{ padding: "24px 20px 120px" }}>

          {/* Title */}
          <h1 style={{
            fontSize: 26, fontWeight: 800,
            color: "var(--color-text-primary)",
            lineHeight: 1.15, letterSpacing: "-0.03em",
            marginBottom: 10,
          }}>
            {event.title}
          </h1>

          {/* Subtitle chips + attendees */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {subtitleChips.map((chip) => (
              <span key={chip} style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 9999, padding: "4px 12px",
                fontSize: 11, fontWeight: 600,
                color: "var(--color-text-secondary)",
              }}>
                {chip}
              </span>
            ))}
            <span style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 9999, padding: "4px 12px",
              fontSize: 11, fontWeight: 600,
              color: "var(--color-text-secondary)",
            }}>
              <Users size={11} strokeWidth={2} />
              {event.attendees.toLocaleString("en-IN")} going
            </span>
          </div>

          {/* Organizer row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 7,
              background: "var(--color-accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 7, fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>GO</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)" }}>
              Presented by <strong style={{ color: "var(--color-text-secondary)" }}>{event.organizer}</strong>
            </span>
          </div>

          {/* Date | Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <MetaBox icon={<Calendar size={16} color="var(--color-accent)" />} label="Date" value={event.date} />
            <MetaBox icon={<Clock    size={16} color="var(--color-accent)" />} label="Time" value={event.time} />
          </div>

          {/* Venue */}
          <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-lg)", padding: "14px 16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 26,
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

          {/* About */}
          <div style={{ marginBottom: 26 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
              About
            </p>
            {pullQuote && (
              <div style={{ borderLeft: "3px solid var(--color-accent)", paddingLeft: 14, marginBottom: 14 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.55, fontStyle: "italic" }}>
                  &ldquo;{pullQuote}&rdquo;
                </p>
              </div>
            )}
            <p style={{ fontSize: 13.5, color: "var(--color-text-secondary)", lineHeight: 1.72 }}>
              {bodyText}
            </p>
          </div>

          {/* Know Before You Go */}
          {(event.seats || event.section) && (
            <div style={{ marginBottom: 26 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Know Before You Go
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {event.seats && (
                  <InfoTile icon={<Ticket size={15} color="var(--color-accent)" />} label="Ticket" value={event.seats} />
                )}
                {event.section && (
                  <InfoTile icon={<Layers size={15} color="var(--color-accent)" />} label="Area" value={event.section} />
                )}
              </div>
            </div>
          )}

          {/* Map */}
          <div style={{
            borderRadius: "var(--radius-xl)", overflow: "hidden",
            height: 200,
            border: "1px solid var(--color-border-subtle)",
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

        </div>
      </div>

      {/* ── Sticky CTA bar ── */}
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 1 }}>Starts From</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {event.price}
            </p>
          </div>
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

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      background: "var(--color-bg-surface)",
      border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg)", padding: "14px",
      display: "flex", alignItems: "flex-start", gap: 10,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: "var(--color-accent-dim)",
        border: "1px solid var(--color-border-active)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginTop: 1,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)" }}>{value}</p>
      </div>
    </div>
  );
}
