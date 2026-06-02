"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy, type LucideIcon } from "lucide-react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import { events, categories, getEventsByCategory } from "../data/events";

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

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = getEventsByCategory(activeCategory).filter((e) =>
    search.trim() === ""
      ? true
      : e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-root" style={{ padding: "52px 0 0" }}>

      {/* Header */}
      <div className="dc" style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <Link className="mobile-only" href="/" style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-card)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>Explore</h1>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Category icon cards */}
      <div className="dc cats-row" style={{
        display: "flex", gap: 10,
        overflowX: "auto", padding: "0 20px 16px",
        scrollbarWidth: "none",
      }}>
        {categories.map((cat) => {
          const { Icon, color, glow } = categoryConfig[cat]!;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              className="cat-card"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: isActive ? color : "var(--color-bg-card)",
                border: isActive ? "none" : "1px solid var(--color-border-subtle)",
                transform: isActive ? "scale(1.06)" : "scale(1)",
                boxShadow: isActive ? `0 0 22px ${glow}` : "none",
              }}
            >
              <span className="cat-icon">
                <Icon size={24} strokeWidth={1.8} color={isActive ? "#fff" : color} />
              </span>
              <span className="cat-label" style={{ color: isActive ? "#fff" : "var(--color-text-muted)" }}>
                {cat}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="dc" style={{ padding: "0 20px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500 }}>
          {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Events grid — 2 cols mobile, 3 cols desktop */}
      {filtered.length > 0 ? (
        <div className="dc events-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: "0 20px",
          paddingBottom: 20,
        }}>
          {filtered.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} style={{ display: "block", textDecoration: "none" }}>
              <div className="pressable explore-card">
                <img src={event.image} alt={event.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="gradient-card" style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <span style={{ background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)", borderRadius: 9999, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {event.tag}
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {event.title}
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{event.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="dc" style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 16, color: "var(--color-text-muted)", fontWeight: 600 }}>No events found</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>Try a different filter or search term</p>
        </div>
      )}
    </div>
  );
}
