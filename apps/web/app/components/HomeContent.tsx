"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, MapPin, ChevronRight, Clock, ArrowUpRight, LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy, type LucideIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";
import { events, categories, getEventsByCategory } from "../data/events";

const featured = events.filter((e) => e.featured || e.attendees > 5000).slice(0, 3);
const popularThisWeek = [...events].sort((a, b) => b.attendees - a.attendees).slice(0, 4);

const categoryConfig: Record<string, { Icon: LucideIcon }> = {
  "All":         { Icon: LayoutGrid },
  "Concerts":    { Icon: Mic2 },
  "Festivals":   { Icon: Sparkles },
  "Comedy":      { Icon: Smile },
  "Nightlife":   { Icon: Moon },
  "Conferences": { Icon: Lightbulb },
  "Dining":      { Icon: UtensilsCrossed },
  "Sports":      { Icon: Trophy },
};

const tickerItems = [
  "50K+ MUSIC LOVERS", "LIVE EVENTS", "CONCERTS", "FESTIVALS",
  "BOOK NOW", "NEW SHOWS", "SOLD OUT", "HOT PICKS", "NIGHTLIFE",
];

export default function HomeContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const filtered = getEventsByCategory(activeCategory).filter((e) =>
    search.trim() === ""
      ? true
      : e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
  );

  const upcoming = filtered.filter((e) => !e.featured).slice(0, 6);

  return (
    <div style={{ minHeight: "100svh", paddingBottom: 110 }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ padding: "56px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          {/* Greeting */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <MapPin size={11} strokeWidth={2} color="var(--color-accent)" />
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>Hyderabad, India</p>
              <ChevronRight size={11} color="var(--color-text-muted)" />
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>
              Hey, Tanish 👋
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", position: "relative",
              }}
            >
              <Bell size={18} color="var(--color-text-secondary)" strokeWidth={1.8} />
              <span style={{
                position: "absolute", top: 8, right: 8, width: 7, height: 7,
                borderRadius: 9999, background: "var(--color-accent)",
                border: "1.5px solid var(--color-bg-base)",
              }} />
            </button>
            <Link
              href="/profile"
              style={{
                width: 40, height: 40, borderRadius: 9999,
                background: "linear-gradient(135deg, #F26B3A, #FF8A5C)",
                border: "2px solid rgba(242,107,58,0.40)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "#fff",
                textDecoration: "none",
                boxShadow: "0 0 16px rgba(242,107,58,0.35)",
              }}
            >
              T
            </Link>
          </div>
        </div>

        {/* Hero title */}
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h1 style={{
            fontSize: 36, fontWeight: 800, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.035em",
          }}>
            <span style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Discover</span>
            <br />What&apos;s Happening
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500, marginTop: 6 }}>
            {events.length} events · {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* ── Category icon cards ────────────────────────────── */}
      <div style={{
        display: "flex", gap: 10, overflowX: "auto",
        padding: "20px 20px 4px", scrollbarWidth: "none",
      }}>
        {categories.map((cat) => {
          const { Icon } = categoryConfig[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, width: 72, height: 82,
                borderRadius: 18,
                background: isActive ? "var(--color-accent)" : "var(--color-bg-card)",
                border: isActive ? "none" : "1px solid var(--color-border-subtle)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8,
                cursor: "pointer",
                transition: "all 160ms ease",
                transform: isActive ? "scale(1.06)" : "scale(1)",
                boxShadow: isActive ? "0 0 22px rgba(242,107,58,0.45)" : "none",
              }}
            >
              <Icon size={24} strokeWidth={1.8} color={isActive ? "#fff" : "var(--color-text-secondary)"} />
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.01em",
                color: isActive ? "#fff" : "var(--color-text-muted)",
              }}>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* ── Featured carousel ──────────────────────────────── */}
      <div style={{ marginTop: 20, }}>
        <FeaturedCarousel items={featured} activeIdx={featuredIdx} onDotClick={setFeaturedIdx} />
      </div>

      {/* ── Marquee ticker ─────────────────────────────────── */}
      <div style={{
        marginTop: 20,
        background: "var(--color-accent)",
        padding: "9px 0",
        position: "relative", zIndex: 1,
      }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} style={{
                fontSize: 11, fontWeight: 800, color: "#fff",
                textTransform: "uppercase", letterSpacing: "0.08em",
                padding: "0 16px",
                display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
              }}>
                {item}
                <span style={{ fontSize: 8, opacity: 0.7 }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Popular This Week (list rows) ──────────────────── */}
      <section style={{ marginTop: 28, }}>
        <div style={{ padding: "0 20px", marginBottom: 14 }}>
          <SectionHeader title="Popular This Week" href="/explore" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 20px" }}>
          {popularThisWeek.map((event, i) => (
            <Link key={event.id} href={`/events/${event.id}`} className="popular-row">
              {/* Rank */}
              <span style={{
                fontSize: 13, fontWeight: 800,
                color: i === 0 ? "var(--color-accent)" : "var(--color-text-muted)",
                width: 20, flexShrink: 0, textAlign: "center",
              }}>
                {i + 1}
              </span>

              {/* Thumbnail */}
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                overflow: "hidden", flexShrink: 0,
                border: "1px solid var(--color-border-subtle)",
              }}>
                <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 13, fontWeight: 700, color: "#fff",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  marginBottom: 3,
                }}>
                  {event.title}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>
                    {event.location.split(",")[0]}
                  </span>
                </div>
              </div>

              {/* Date pill */}
              <div style={{
                background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-active)",
                borderRadius: 9999,
                padding: "4px 10px",
                fontSize: 10, fontWeight: 700, color: "var(--color-accent)",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {event.date.split(" ").slice(0, 2).join(" ")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Upcoming Events (cards) ────────────────────────── */}
      {upcoming.length > 0 && (
        <section style={{ marginTop: 32, }}>
          <div style={{ padding: "0 20px", marginBottom: 14 }}>
            <SectionHeader title="Upcoming Events" href="/explore" />
          </div>
          <div className="events-row">
            {upcoming.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", }}>
          <p style={{ fontSize: 16, color: "var(--color-text-muted)", fontWeight: 600 }}>No events found</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>Try a different search or category</p>
        </div>
      )}
    </div>
  );
}

/* ── Featured Carousel ─────────────────────────────────────── */
function FeaturedCarousel({
  items,
  activeIdx,
  onDotClick,
}: {
  items: typeof events;
  activeIdx: number;
  onDotClick: (i: number) => void;
}) {
  const event = items[activeIdx];
  if (!event) return null;

  return (
    <div style={{ padding: "0 20px" }}>
      <Link
        href={`/events/${event.id}`}
        className="pressable"
        style={{
          display: "block", textDecoration: "none",
          position: "relative", borderRadius: "var(--radius-card)",
          overflow: "hidden", height: 340,
          boxShadow: "0 8px 40px rgba(0,0,0,0.50)",
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,14,0) 0%, rgba(10,10,14,0.50) 40%, rgba(10,10,14,0.97) 100%)",
        }} />

        {/* Top: tag + date */}
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between" }}>
          <span style={{
            background: "var(--color-accent)", borderRadius: 9999,
            padding: "4px 12px", fontSize: 10, fontWeight: 800,
            color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em",
          }}>
            {event.tag}
          </span>
          <span style={{
            background: "rgba(10,10,14,0.65)", backdropFilter: "blur(8px)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#fff",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            📅 {event.date.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>

        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px 18px" }}>
          {/* Attendees */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <AvatarStack count={4} />
            <span style={{
              fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600,
              background: "rgba(10,10,14,0.50)", backdropFilter: "blur(6px)",
              padding: "3px 10px", borderRadius: 9999,
            }}>
              {event.attendees.toLocaleString()}+ attending
            </span>
          </div>

          <h2 style={{
            fontSize: 22, fontWeight: 800, color: "#fff",
            lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: 12,
          }}>
            {event.title}
          </h2>

          {/* Meta + CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <MetaPill icon="📍" text={event.city} />
              <MetaPill icon="🕐" text={event.time} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "var(--color-accent)", color: "#fff",
              borderRadius: 9999, padding: "10px 16px",
              fontSize: 13, fontWeight: 700,
              boxShadow: "0 0 20px rgba(242,107,58,0.45)",
            }}>
              {event.price} <ArrowUpRight size={14} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>

      {/* Carousel dots */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: 6, marginTop: 14,
      }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`dot ${i === activeIdx ? "dot-active" : ""}`}
            style={{ border: "none", cursor: "pointer", padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

function MetaPill({ icon, text }: { icon: string; text: string }) {
  return (
    <span style={{
      display: "flex", alignItems: "center", gap: 4,
      background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)",
      borderRadius: 9999, padding: "5px 10px",
      fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.90)",
    }}>
      {icon} {text}
    </span>
  );
}

function AvatarStack({ count }: { count: number }) {
  const colors = ["#6366F1", "#F26B3A", "#22C55E", "#EC4899"];
  return (
    <div className="avatar-stack">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: 26, height: 26, borderRadius: 9999,
          background: colors[i % colors.length],
          border: "2px solid rgba(10,10,14,0.80)", flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{title}</h2>
      <Link href={href} style={{
        fontSize: 12, fontWeight: 600, color: "var(--color-accent)",
        display: "flex", alignItems: "center", gap: 2, textDecoration: "none",
      }}>
        View All <ChevronRight size={12} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
