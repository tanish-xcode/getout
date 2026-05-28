"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowUpRight, MapPin } from "lucide-react";
import { events } from "../data/events";

const defaultSaved = [events[0]!.id, events[2]!.id, events[3]!.id];

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>(defaultSaved);

  const savedEvents = events.filter((e) => savedIds.includes(e.id));

  function unsave(id: string) {
    setSavedIds((prev) => prev.filter((s) => s !== id));
  }

  return (
    <div style={{ minHeight: "100svh", padding: "52px 20px 110px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>
        Saved
      </h1>
      <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 28 }}>
        {savedEvents.length} event{savedEvents.length !== 1 ? "s" : ""} saved
      </p>

      {savedEvents.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: 9999,
              background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Heart size={32} color="var(--color-text-muted)" strokeWidth={1.5} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Nothing saved yet</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 24 }}>
            Tap the heart on any event to save it here
          </p>
          <Link
            href="/explore"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--color-accent)", color: "#fff",
              borderRadius: 9999, padding: "12px 24px",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 0 20px rgba(242,107,58,0.35)",
            }}
          >
            Explore Events <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {savedEvents.map((event) => (
            <div
              key={event.id}
              style={{
                display: "flex",
                gap: 14,
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
              }}
            >
              <Link href={`/events/${event.id}`} style={{ flexShrink: 0, display: "block" }}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: 90, height: 100, objectFit: "cover" }}
                />
              </Link>
              <div style={{ flex: 1, padding: "12px 14px 12px 0", minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, color: "var(--color-accent)",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    background: "var(--color-accent-dim)",
                    border: "1px solid var(--color-border-active)",
                    borderRadius: 9999, padding: "2px 8px",
                  }}
                >
                  {event.tag}
                </span>
                <Link href={`/events/${event.id}`} style={{ textDecoration: "none" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginTop: 6, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {event.title}
                  </p>
                </Link>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                  <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                  <p style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 500 }}>{event.city} · {event.date.split(" ").slice(0, 2).join(" ")}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "var(--color-accent)" }}>{event.price}</p>
                  <button
                    onClick={() => unsave(event.id)}
                    style={{
                      width: 30, height: 30, borderRadius: 9999,
                      background: "rgba(239,68,68,0.10)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Heart size={13} color="#EF4444" fill="#EF4444" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
