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

      {/* ══ MOBILE: banner image at top ══════════════════════════ */}
      <div className="event-mobile-banner">
        <div style={{ position: "relative" }}>
          <picture>
            {event.imageMobile && (
              <source media="(max-width: 767px)" srcSet={event.imageMobile} />
            )}
            <img src={event.image} alt={event.title}
              style={{ width: "100%", height: "auto", display: "block" }} />
          </picture>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,14,0.40) 0%, rgba(10,10,14,0) 30%, rgba(10,10,14,0.80) 65%, rgba(10,10,14,0.96) 100%)",
          }} />
          {/* Buttons */}
          <div style={{ position: "absolute", top: 52, left: 20, right: 20, display: "flex", justifyContent: "space-between", zIndex: 2 }}>
            <Link href="/" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowLeft size={18} color="#fff" strokeWidth={2} />
            </Link>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Bookmark size={18} color="#fff" strokeWidth={1.8} />
              </button>
              <button type="button" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(10,10,14,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Share2 size={18} color="#fff" strokeWidth={1.8} />
              </button>
            </div>
          </div>
          {/* Tag + Title + Chips */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 28px", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "var(--color-accent)", borderRadius: 9999, padding: "3px 12px", fontSize: 10, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              {event.tag}
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 12 }}>
              {event.title}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {subtitleChips.map((chip) => (
                <span key={chip} style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "#fff" }}>
                  {chip}
                </span>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "#fff" }}>
                <Users size={11} strokeWidth={2} />
                {event.attendees.toLocaleString("en-IN")} going
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ DESKTOP: cinematic hero (District-style) ════════════ */}
      <div className="event-desktop-hero">
        {/* Vivid blurred background */}
        <div style={{
          position: "absolute", inset: "-60px", zIndex: 0,
          backgroundImage: `url("${event.image}")`,
          backgroundSize: "cover",
          backgroundPosition: event.imagePosition ?? "center",
          filter: "blur(80px) saturate(1.8) brightness(1.1)",
          opacity: 0.6,
          transform: "scale(1.08)",
        }} />
        {/* Directional dark overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(115deg, rgba(2,2,8,0.97) 0%, rgba(2,2,8,0.90) 30%, rgba(2,2,8,0.55) 58%, rgba(2,2,8,0.12) 100%)" }} />
        {/* Accent glow — top-left behind title */}
        <div style={{ position: "absolute", top: -80, left: -60, width: 700, height: 700, zIndex: 1, background: "radial-gradient(circle, rgba(242,107,58,0.22) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* Subtle dot-grid texture */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: "linear-gradient(to bottom, transparent, var(--color-bg-base))", zIndex: 2, pointerEvents: "none" }} />

        {/* Nav */}
        <div style={{ position: "absolute", top: 20, left: 48, right: 48, display: "flex", justifyContent: "space-between", zIndex: 4 }}>
          <Link href="/" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeft size={18} color="#fff" strokeWidth={2} />
          </Link>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Bookmark size={18} color="#fff" strokeWidth={1.8} />
            </button>
            <button type="button" style={{ width: 40, height: 40, borderRadius: 9999, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Share2 size={18} color="#fff" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Split: left info | right poster */}
        <div className="event-hero-split" style={event.portrait ? { gridTemplateColumns: "1fr 500px" } : undefined}>

          {/* ── Left ── */}
          <div className="event-hero-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(242,107,58,0.18)", border: "1px solid rgba(242,107,58,0.45)", borderRadius: 9999, padding: "5px 16px", fontSize: 11, fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, backdropFilter: "blur(8px)" }}>
              <span style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--color-accent)", display: "inline-block" }} />
              {event.tag}
            </div>

            <h1 style={{ fontSize: 62, fontWeight: 800, color: "#fff", lineHeight: 0.98, letterSpacing: "-0.04em", marginBottom: 20, textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>
              {event.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {subtitleChips.map((chip) => (
                <span key={chip} style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)", borderRadius: 9999, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>
                  {chip}
                </span>
              ))}
              <span style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)", borderRadius: 9999, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>
                <Users size={12} strokeWidth={2} />
                {event.attendees.toLocaleString("en-IN")} going
              </span>
            </div>

            {/* Accent divider */}
            <div style={{ width: 48, height: 3, background: "var(--color-accent)", borderRadius: 2, marginBottom: 24, boxShadow: "0 0 12px rgba(242,107,58,0.6)" }} />

            {/* Organizer */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 7, fontWeight: 800, color: "#fff" }}>GO</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.50)" }}>
                Presented by <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>{event.organizer}</strong>
              </span>
            </div>

            {/* Meta chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
                <Calendar size={14} color="var(--color-accent)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{event.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
                <Clock size={14} color="var(--color-accent)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{event.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
                <MapPin size={14} color="var(--color-accent)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{event.location}</span>
              </div>
            </div>

            {/* Book Now */}
            <Link href={`/checkout/${event.id}`} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--color-accent)",
              color: "#fff", borderRadius: 14,
              padding: "0 40px", height: 58,
              fontSize: 17, fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 0 48px rgba(242,107,58,0.60), 0 8px 32px rgba(242,107,58,0.30)",
              letterSpacing: "-0.01em",
            }}>
              Book Now &nbsp;·&nbsp; {event.price}
            </Link>
          </div>

          {/* ── Right: poster card ── */}
          <div className="event-hero-right" style={{ position: "relative" }}>
            {/* Glow pool behind poster */}
            <div style={{
              position: "absolute", inset: "-30px", zIndex: 0,
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(242,107,58,0.28) 0%, transparent 70%)",
              filter: "blur(24px)",
              pointerEvents: "none",
            }} />
            <picture style={{ position: "relative", zIndex: 1, display: "block" }}>
              {event.imageMobile && (
                <source media="(max-width: 767px)" srcSet={event.imageMobile} />
              )}
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%", height: "auto", display: "block",
                  borderRadius: 20,
                  transform: "rotate(-2deg) translateY(-6px)",
                  boxShadow: "0 48px 120px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(242,107,58,0.18)",
                  transition: "transform 300ms ease",
                }}
              />
            </picture>
          </div>
        </div>
      </div>

      {/* ══ Details scroll (both mobile + desktop) ══════════════ */}
      <div className="event-detail-scroll" style={{ padding: "28px 20px 120px" }}>

        {/* Mobile only: organizer + date/time/venue */}
        <div className="event-mobile-meta">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 7, fontWeight: 800, color: "#fff" }}>GO</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)" }}>
              Presented by <strong style={{ color: "var(--color-text-secondary)" }}>{event.organizer}</strong>
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <MetaBox icon={<Calendar size={16} color="var(--color-accent)" />} label="Date" value={event.date} />
            <MetaBox icon={<Clock    size={16} color="var(--color-accent)" />} label="Time" value={event.time} />
          </div>
          <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={15} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Venue</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{event.location}</p>
              </div>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: 9999, background: "var(--color-bg-card)", border: "1px solid var(--color-border-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={13} color="var(--color-text-muted)" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: 26 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>About</p>
          {pullQuote && (
            <div style={{ borderLeft: "3px solid var(--color-accent)", paddingLeft: 14, marginBottom: 14 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.55, fontStyle: "italic" }}>
                &ldquo;{pullQuote}&rdquo;
              </p>
            </div>
          )}
          <p style={{ fontSize: 13.5, color: "var(--color-text-secondary)", lineHeight: 1.72 }}>{bodyText}</p>
        </div>

        {/* Know Before You Go */}
        {(event.seats || event.section) && (
          <div style={{ marginBottom: 26 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Know Before You Go</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {event.seats && <InfoTile icon={<Ticket size={15} color="var(--color-accent)" />} label="Ticket" value={event.seats} />}
              {event.section && <InfoTile icon={<Layers size={15} color="var(--color-accent)" />} label="Area" value={event.section} />}
            </div>
          </div>
        )}

        {/* Map */}
        <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", height: 200, border: "1px solid var(--color-border-subtle)" }}>
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

      {/* ══ Mobile sticky CTA ════════════════════════════════════ */}
      <div className="event-mobile-cta" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
        padding: "12px 20px 28px",
        background: "linear-gradient(to top, var(--color-bg-base) 60%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 430, margin: "0 auto", background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: 20, padding: "12px 12px 12px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 -4px 32px rgba(0,0,0,0.18), 0 0 0 1px var(--color-border-subtle)" }}>
          <button type="button" style={{ width: 50, height: 50, borderRadius: 14, background: "var(--color-bg-card)", border: "1.5px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <Heart size={20} color="var(--color-accent)" strokeWidth={2} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 1 }}>Starts From</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>{event.price}</p>
          </div>
          <Link href={`/checkout/${event.id}`} style={{ background: "var(--color-accent)", color: "#fff", borderRadius: 14, padding: "0 28px", height: 50, fontSize: 15, fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 24px rgba(242,107,58,0.45)", letterSpacing: "-0.01em" }}>
            Book Now
          </Link>
        </div>
      </div>

    </div>
  );
}

function MetaBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px" }}>
      <div style={{ marginBottom: 6 }}>{icon}</div>
      <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{value}</p>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)" }}>{value}</p>
      </div>
    </div>
  );
}
