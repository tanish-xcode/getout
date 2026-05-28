"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutGrid, Mic2, Sparkles, Smile, Moon, Lightbulb, UtensilsCrossed, Trophy, type LucideIcon } from "lucide-react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import { events, categories, getEventsByCategory } from "../data/events";

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
    <div style={{ minHeight: "100svh", padding: "52px 0 110px" }}>
      {/* Header */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <Link
            href="/"
            style={{
              width: 40, height: 40, borderRadius: 9999,
              background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <ArrowLeft size={18} color="#fff" strokeWidth={2} />
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Explore</h1>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Category icon cards */}
      <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 20px 16px", scrollbarWidth: "none" }}>
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

      {/* Results count */}
      <div style={{ padding: "0 20px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500 }}>
          {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Grid — 2 columns */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 20px" }}>
          {filtered.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} style={{ display: "block", textDecoration: "none" }}>
              <div
                className="pressable"
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  height: 220,
                  boxShadow: "var(--shadow-card)",
                }}
              >
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
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: 16, color: "var(--color-text-muted)", fontWeight: 600 }}>No events found</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>Try a different filter or search term</p>
        </div>
      )}
    </div>
  );
}
