"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Bell, MapPin, ChevronRight, ArrowUpRight,
  LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy,
  Sun, type LucideIcon,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { events, categories, getEventsByCategory } from "../data/events";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

const featured = events.filter((e) => e.featured);

type CatConfig = { Icon: LucideIcon; color: string; glow: string };

const categoryConfig: Record<string, CatConfig> = {
  "All":         { Icon: LayoutGrid,     color: "#F26B3A", glow: "rgba(242,107,58,0.45)"  },
  "Concerts":    { Icon: Mic2,           color: "#8B5CF6", glow: "rgba(139,92,246,0.45)"  },
  "Festivals":   { Icon: Sparkles,       color: "#EC4899", glow: "rgba(236,72,153,0.45)"  },
  "Comedy":      { Icon: Smile,          color: "#F59E0B", glow: "rgba(245,158,11,0.45)"  },
  "Nightlife":   { Icon: Moon,           color: "#6366F1", glow: "rgba(99,102,241,0.45)"  },
  "Conferences": { Icon: Lightbulb,      color: "#3B82F6", glow: "rgba(59,130,246,0.45)"  },
  "Dining":      { Icon: UtensilsCrossed,color: "#10B981", glow: "rgba(16,185,129,0.45)"  },
  "Sports":      { Icon: Trophy,         color: "#EF4444", glow: "rgba(239,68,68,0.45)"   },
};

const tickerItems = [
  "LIVE EVENTS", "CONCERTS", "FESTIVALS", "HOT PICKS", "NIGHTLIFE",
];

export default function HomeContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [animKey, setAnimKey] = useState<string | null>(null);
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const displayName = user ? user.name.split(" ")[0] : "Guest";
  const initials    = user ? user.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  const filtered = getEventsByCategory(activeCategory).filter((e) =>
    search.trim() === ""
      ? true
      : e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
  );

  const popularThisWeek = [...filtered].sort((a, b) => b.attendees - a.attendees);

  function handleCategoryClick(cat: string) {
    setActiveCategory(cat);
    setAnimKey(cat);
    setTimeout(() => setAnimKey(null), 500);
  }

  const isLight = theme === "light";

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
              Hey, {displayName} 👋
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Theme toggle */}
            <button type="button" onClick={() => { toggle(); }} style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              <span className="theme-toggle-icon">
                {isLight
                  ? <Moon size={17} color="var(--color-text-secondary)" strokeWidth={2} />
                  : <Sun  size={17} color="var(--color-text-secondary)" strokeWidth={2} />
                }
              </span>
            </button>

            {/* Notification bell */}
            <button type="button" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              <Bell size={18} color="var(--color-text-secondary)" strokeWidth={1.8} />
              <span style={{
                position: "absolute", top: 7, right: 7, width: 7, height: 7,
                borderRadius: 9999, background: "var(--color-accent)",
                border: isLight ? "1.5px solid #FFF9F6" : "1.5px solid #0A0A0E",
              }} />
            </button>

            {/* Profile avatar */}
            <Link href="/profile" style={{
              width: 40, height: 40, borderRadius: 9999,
              background: user ? "linear-gradient(135deg, #F26B3A, #FF8A5C)" : "var(--color-bg-card)",
              border: user ? "2px solid rgba(242,107,58,0.40)" : "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800, color: user ? "#fff" : "var(--color-text-muted)",
              textDecoration: "none",
              boxShadow: user ? "0 0 14px rgba(242,107,58,0.30)" : "none",
            }}>{initials}</Link>
          </div>
        </div>

        {/* Desktop hero split */}
        <div className="home-hero-inner">

          {/* Left: title + search */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <h1 className="home-hero-title">
                <span className="shimmer-title">Discover</span>
                <br />
                <span>What&apos;s Happening</span>
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
                  boxShadow: "0 20px 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.06)",
                  transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms ease",
                  animation: "float-card 4s ease-in-out infinite",
                }}>
                  <img
                    src={featured[0].image} alt={featured[0].title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(10,10,14,0.10) 0%, rgba(10,10,14,0) 35%, rgba(10,10,14,0.88) 100%)",
                  }} />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{
                      background: "var(--color-accent)", borderRadius: 9999,
                      padding: "4px 12px", fontSize: 10, fontWeight: 800,
                      color: "#fff", textTransform: "uppercase", letterSpacing: "0.07em",
                    }}>{featured[0].tag}</span>
                  </div>
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

        </div>
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
          const { Icon, color, glow } = categoryConfig[cat]!;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              className={`cat-card ${isActive && animKey === cat ? "cat-active-anim" : ""}`}
              onClick={() => handleCategoryClick(cat)}
              style={{
                background: isActive ? color : "var(--color-bg-card)",
                border: isActive ? "none" : "1px solid var(--color-border-subtle)",
                transform: isActive ? "scale(1.06)" : "scale(1)",
                boxShadow: isActive ? `0 0 22px ${glow}` : "none",
              }}
            >
              <span className="cat-icon">
                <Icon
                  size={24}
                  strokeWidth={1.8}
                  color={isActive ? "#fff" : color}
                />
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
                      fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)",
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
            border: "1px solid rgba(255,255,255,0.12)",
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
      <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>{title}</h2>
      <Link href={href} style={{
        fontSize: 12, fontWeight: 600, color: "var(--color-accent)",
        display: "flex", alignItems: "center", gap: 2, textDecoration: "none",
      }}>
        View All <ChevronRight size={12} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
