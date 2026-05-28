"use client";
import { useState } from "react";

const chips = ["All", "Today", "Trending", "Nearby", "Upcoming", "Free"];

export default function FilterChips() {
  const [active, setActive] = useState("All");

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 4,
        scrollbarWidth: "none",
      }}
    >
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => setActive(chip)}
          className={`filter-chip pressable ${active === chip ? "filter-chip-active" : "filter-chip-inactive"}`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
