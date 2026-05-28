"use client";
import { Search, SlidersHorizontal } from "lucide-react";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
}

export default function SearchBar({ value = "", onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          padding: "0 16px",
          height: 48,
          transition: "border-color 200ms ease",
        }}
      >
        <Search size={18} color="var(--color-text-muted)" strokeWidth={2} />
        <input
          type="text"
          placeholder="Search events, venues, artists..."
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 14,
            color: "var(--color-text-primary)",
          }}
        />
        {value && (
          <button
            onClick={() => onChange?.("")}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        )}
      </div>
      <button
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-lg)",
          background: "var(--color-accent-dim)",
          border: "1px solid var(--color-border-active)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <SlidersHorizontal size={18} color="var(--color-accent)" strokeWidth={2} />
      </button>
    </div>
  );
}
