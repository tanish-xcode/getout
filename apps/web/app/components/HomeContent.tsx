"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, MapPin, ChevronRight, Clock, ArrowUpRight, LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy, type LucideIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";
import { events, categories, getEventsByCategory } from "../data/events";

const featured = events.filter((e) => e.featured);

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
  "LIVE EVENTS", "CONCERTS", "FESTIVALS", "HOT PICKS", "NIGHTLIFE",
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

  const popularThisWeek = [...filtered].sort((a, b) => b.attendees - a.attendees);

  return (
    <div className="page-root">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="dc" style={{ padding: "56px 20px 0" }}>

        {/* Mobile-only greeting row */}
        <div className="home-greeting">
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
            <button className="mobile-only" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              <Bell size={18} color="var(--color-text-secondary)" strokeWidth={1.8} />
              <span style={{
                position: "absolute", top: 8, right: 8, width: 7, height: 7,
                borderRadius: 9999, background: "var(--color-accent)",
                border: "1.5px solid var(--color-bg-base)",
              }} />
            </button>
            <Link className="mobile-only" href="/profile" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "linear-gradient(135deg, #F26B3A, #FF8A5C)",
              border: "2px solid rgba(242,107,58,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "#fff",
              textDecoration: "none",
              boxShadow: "0 0 16px rgba(242,107,58,0.35)",
            }}>T</Link>
          </div>
        </div>

        {/* Desktop hero split: left = title+search, right = event preview card */}
        <div className="home-hero-inner">

          {/* Left: title + search */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <h1 className="home-hero-title">
                <span style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Discover</span>
                <br />What&apos;s Happening
              </h1>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500, marginTop: 6 }}>
                {events.length} events · {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Right: featured event preview (desktop-only) */}
          <div className="home-hero-right">
            {featured[0] && (
              <Link
                href={`/events/${featured[0].id}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div style={{
                  position: "relative", borderRadius: 24, overflow: "hidden",
                  height: 260,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
                }}>
                  <img
                    src={featured[0].image} alt={featured[0].title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(10,10,14,0.10) 0%, rgba(10,10,14,0) 35%, rgba(10,10,14,0.88) 100%)",
                  }} />
                  {/* Tag */}
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{
                      background: "var(--color-accent)", borderRadius: 9999,
                      padding: "4px 12px", fontSize: 10, fontWeight: 800,
                      color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em",
                    }}>{featured[0].tag}</span>
                  </div>
                  {/* Bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                    <p style={{
                      fontSize: 16, fontWeight: 800, color: "#fff",
                      lineHeight: 1.25, marginBottom: 10, letterSpacing: "-0.02em",
                    }}>
                      {featured[0].title}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.70)", fontWeight: 600 }}>
                        📅 {featured[0].date} · {featured[0].city}
                      </span>
                      <span style={{
                        background: "var(--color-accent)", color: "#fff",
                        borderRadius: 9999, padding: "6px 16px",
                        fontSize: 12, fontWeight: 800,
                        boxShadow: "0 0 16px rgba(242,107,58,0.50)",
                      }}>
                        {featured[0].price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

        </div>{/* end home-hero-inner */}
      </div>

      {/* ── Marquee ticker ─────────────────────────────────────── */}
      <div style={{
        marginTop: 20,
        background: "var(--color-accent)",
        padding: "9px 0",
        position: "relative", zIndex: 1,
      }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
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

      {/* ── Category icon cards ──────────────────────────────── */}
      <div className="dc cats-row" style={{
        display: "flex", gap: 10,
        overflowX: "auto", padding: "20px 20px 4px",
        scrollbarWidth: "none",
      }}>
        {categories.map((cat) => {
          const { Icon } = categoryConfig[cat]!;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              className="cat-card"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: isActive ? "var(--color-accent)" : "var(--color-bg-card)",
                border: isActive ? "none" : "1px solid var(--color-border-subtle)",
                transform: isActive ? "scale(1.06)" : "scale(1)",
                boxShadow: isActive ? "0 0 22px rgba(242,107,58,0.45)" : "none",
              }}
            >
              <span className="cat-icon">
                <Icon size={24} strokeWidth={1.8} color={isActive ? "#fff" : "var(--color-text-secondary)"} />
              </span>
              <span className="cat-label" style={{ color: isActive ? "#fff" : "var(--color-text-muted)" }}>
                {cat}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Main content: Featured + Popular ─────────────────── */}
      <div className="dc home-main-grid" style={{ marginTop: 20 }}>

        {/* Featured carousel */}
        <div>
          <FeaturedCarousel items={featured} activeIdx={featuredIdx} onDotClick={setFeaturedIdx} />
        </div>

        {/* Popular This Week */}
        <section>
          <div className="popular-header-pad">
            <SectionHeader title="Popular This Week" href="/explore" />
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <p style={{ fontSize: 15, color: "var(--color-text-muted)", fontWeight: 600 }}>No events found</p>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>Try a different search or category</p>
            </div>
          ) : (
            <div className="popular-list-pad">
              {popularThisWeek.map((event, i) => (
                <Link key={event.id} href={`/events/${event.id}`} className="popular-row">
                  <span style={{
                    fontSize: 13, fontWeight: 800,
                    color: i === 0 ? "var(--color-accent)" : "var(--color-text-muted)",
                    width: 20, flexShrink: 0, textAlign: "center",
                  }}>
                    {i + 1}
                  </span>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    overflow: "hidden", flexShrink: 0,
                    border: "1px solid var(--color-border-subtle)",
                  }}>
                    <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: 13, fontWeight: 700, color: "#fff",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      marginBottom: 3,
                    }}>{event.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                      <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>
                        {event.location.split(",")[0]}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    background: "var(--color-accent-dim)",
                    border: "1px solid var(--color-border-active)",
                    borderRadius: 9999, padding: "4px 10px",
                    fontSize: 10, fontWeight: 700, color: "var(--color-accent)",
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {event.date.split(" ").slice(0, 2).join(" ")}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

    </div>
  );
}

/* ── Featured Carousel ───────────────────────────────────────── */
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
    <div className="featured-carousel-pad">
      <Link
        href={`/events/${event.id}`}
        className="pressable featured-card-link"
      >
        <img
          src={event.image}
          alt={event.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
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
          }}>{event.tag}</span>
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
          }}>{event.title}</h2>
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

      {/* Dots */}
      {items.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className={`dot ${i === activeIdx ? "dot-active" : ""}`}
              style={{ border: "none", cursor: "pointer", padding: 0 }}
            />
          ))}
        </div>
      )}
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
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
