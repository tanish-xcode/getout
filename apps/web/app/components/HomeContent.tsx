"use client";
import { useState } from "react";
import Link from "next/link";
import {
  MapPin, ChevronRight, ArrowUpRight,
  LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy,
  Sun, Flower2, type LucideIcon,
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
  "Religious":   { Icon: Flower2,        color: "#F59E0B", glow: "rgba(245,158,11,0.45)"  },
};

const tickerItems = [
  "LIVE EVENTS", "CONCERTS", "FESTIVALS", "HOT PICKS", "NIGHTLIFE",
];

type SortOption = "date" | "price-asc" | "price-desc";
type DateFilter = "any" | "this-week" | "this-month";
type PriceFilter = "any" | "free" | "under-500" | "under-1000" | "under-2000";

export default function HomeContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [animKey, setAnimKey] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter state
  const [sortBy,      setSortBy]      = useState<SortOption>("date");
  const [dateFilter,  setDateFilter]  = useState<DateFilter>("any");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");

  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const displayName = user ? user.name.split(" ")[0] : "Guest";
  const initials    = user ? user.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  const activeFilterCount = (sortBy !== "date" ? 1 : 0) + (dateFilter !== "any" ? 1 : 0) + (priceFilter !== "any" ? 1 : 0);

  const filtered = getEventsByCategory(activeCategory)
    .filter((e) =>
      search.trim() === ""
        ? true
        : e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.city.toLowerCase().includes(search.toLowerCase())
    )
    .filter((e) => {
      if (priceFilter === "free")        return e.priceNum === 0;
      if (priceFilter === "under-500")   return e.priceNum < 500;
      if (priceFilter === "under-1000")  return e.priceNum < 1000;
      if (priceFilter === "under-2000")  return e.priceNum < 2000;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.priceNum - b.priceNum;
      if (sortBy === "price-desc") return b.priceNum - a.priceNum;
      return 0;
    });

  const popularThisWeek = [...filtered].sort((a, b) => b.attendees - a.attendees);

  function handleCategoryClick(cat: string) {
    setActiveCategory(cat);
    setAnimKey(cat);
    setTimeout(() => setAnimKey(null), 500);
  }

  function resetFilters() {
    setSortBy("date");
    setDateFilter("any");
    setPriceFilter("any");
  }

  const isLight = theme === "light";

  return (
    <div className="page-root">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="dc" style={{ padding: "56px 20px 0" }}>

        {/* Mobile-only header row — logo left, actions right */}
        <div className="home-greeting">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Get Out" style={{ height: 34, width: "auto", display: "block" }} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Get Out
              </p>
              <p style={{ fontSize: 8.5, fontWeight: 700, color: "var(--color-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1, marginTop: 3 }}>
                An ASBL Initiative
              </p>
            </div>
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
            <SearchBar value={search} onChange={setSearch} onFilterOpen={() => setFilterOpen(true)} activeFilterCount={activeFilterCount} />
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
          <div className="popular-header-pad">
            <SectionHeader title="Featured Events" href="/explore" />
          </div>
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
                      marginBottom: 4,
                    }}>{event.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                      <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                      <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {event.location.split(",")[0]}
                      </span>
                      {event.category !== "All" && (
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          color: categoryConfig[event.category]?.color ?? "var(--color-accent)",
                          background: `${categoryConfig[event.category]?.color ?? "#F26B3A"}22`,
                          borderRadius: 9999, padding: "1px 7px",
                          textTransform: "uppercase", letterSpacing: "0.04em", flexShrink: 0,
                        }}>{event.category}</span>
                      )}
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

      {/* ── Also in Hyderabad ────────────────────────────────────── */}
      {events.filter(e => !e.featured).length > 0 && (
        <div className="dc" style={{ marginTop: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 3, height: 20, borderRadius: 9999, background: "var(--color-accent)", boxShadow: "0 0 10px rgba(242,107,58,0.55)", flexShrink: 0 }} />
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Also in Hyderabad</h2>
            </div>
            <Link href="/explore" style={{ fontSize: 12, fontWeight: 600, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: 2, textDecoration: "none" }}>
              View All <ChevronRight size={12} strokeWidth={2.5} />
            </Link>
          </div>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", padding: "4px 20px 12px", scrollbarWidth: "none" }}>
            {events.filter(e => !e.featured).map(event => (
              <Link key={event.id} href={`/events/${event.id}`} style={{ display: "block", textDecoration: "none", flexShrink: 0, width: 200 }}>
                <div className="pressable" style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 148, boxShadow: "var(--shadow-card)" }}>
                  <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(10,10,14,0.92) 100%)" }} />
                  <div style={{ position: "absolute", top: 8, left: 8 }}>
                    <span style={{
                      fontSize: 8, fontWeight: 800, color: "#fff",
                      background: categoryConfig[event.category]?.color ?? "var(--color-accent)",
                      borderRadius: 9999, padding: "2px 8px",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>{event.tag}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px" }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {event.title}
                    </p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                      {event.price} · {event.date.split(" ").slice(0, 2).join(" ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Filter Bottom Sheet ──────────────────────────────────── */}
      {filterOpen && (
        <>
          {/* Backdrop */}
          <div onClick={() => setFilterOpen(false)} style={{
            position: "fixed", inset: 0, zIndex: 80,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
          }} />

          {/* Sheet */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
            background: "var(--color-bg-surface)",
            borderRadius: "24px 24px 0 0",
            padding: "0 20px 40px",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.30)",
            maxWidth: 480, margin: "0 auto",
          }}>
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
              <div style={{ width: 36, height: 4, borderRadius: 9999, background: "var(--color-border)" }} />
            </div>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, marginTop: 8 }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Filter & Sort</p>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, color: "var(--color-accent)", fontFamily: "inherit",
                }}>Reset all</button>
              )}
            </div>

            {/* Sort by */}
            <FilterSection label="Sort by">
              {(["date", "price-asc", "price-desc"] as SortOption[]).map((opt) => (
                <FilterChip key={opt} active={sortBy === opt} onClick={() => setSortBy(opt)}>
                  {opt === "date" ? "Date" : opt === "price-asc" ? "Price: Low → High" : "Price: High → Low"}
                </FilterChip>
              ))}
            </FilterSection>

            {/* Price */}
            <FilterSection label="Price">
              {(["any", "free", "under-500", "under-1000", "under-2000"] as PriceFilter[]).map((opt) => (
                <FilterChip key={opt} active={priceFilter === opt} onClick={() => setPriceFilter(opt)}>
                  {opt === "any" ? "Any" : opt === "free" ? "Free" : opt === "under-500" ? "Under ₹500" : opt === "under-1000" ? "Under ₹1,000" : "Under ₹2,000"}
                </FilterChip>
              ))}
            </FilterSection>

            {/* Apply button */}
            <button onClick={() => setFilterOpen(false)} style={{
              width: "100%", height: 52, borderRadius: 16,
              background: "var(--color-accent)", border: "none",
              fontSize: 15, fontWeight: 800, color: "#fff",
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 0 24px rgba(242,107,58,0.40)",
              marginTop: 8,
            }}>
              Show {filtered.length} event{filtered.length !== 1 ? "s" : ""}
            </button>
          </div>
        </>
      )}

    </div>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px", borderRadius: 9999, cursor: "pointer",
      fontFamily: "inherit", fontSize: 13, fontWeight: 600,
      background: active ? "var(--color-accent)" : "var(--color-bg-card)",
      color: active ? "#fff" : "var(--color-text-secondary)",
      border: active ? "1.5px solid var(--color-accent)" : "1px solid var(--color-border)",
      transition: "all 150ms ease",
      boxShadow: active ? "0 0 12px rgba(242,107,58,0.30)" : "none",
    }}>{children}</button>
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
