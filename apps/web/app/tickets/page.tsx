import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { getEventById, events } from "../data/events";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string }>;
}) {
  const { eventId } = await searchParams;
  const event = eventId ? getEventById(eventId) : events[0];

  return (
    <div style={{ minHeight: "100svh", padding: "52px 20px 110px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <Link
          href={event ? `/events/${event.id}` : "/"}
          style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ArrowLeft size={18} color="#fff" strokeWidth={2} />
        </Link>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>My Ticket</h1>
        <button
          style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}
        >
          <Download size={18} color="var(--color-text-secondary)" strokeWidth={1.8} />
        </button>
      </div>

      {/* Boarding pass card */}
      {event && (
        <div
          style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          {/* Event image header */}
          <div style={{ position: "relative", height: 160 }}>
            <img
              src={event.image}
              alt={event.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, rgba(10,10,14,0.10), rgba(10,10,14,0.70))",
              }}
            />
            {/* Tag */}
            <div
              style={{
                position: "absolute", top: 12, left: 14,
                background: "rgba(10,10,14,0.65)", backdropFilter: "blur(8px)",
                border: "1px solid var(--color-border-active)",
                borderRadius: 9999, padding: "3px 10px",
                fontSize: 10, fontWeight: 700, color: "var(--color-accent)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}
            >
              {event.tag}
            </div>
            <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{event.title}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.70)", marginTop: 2, fontWeight: 500 }}>
                {event.organizer}
              </p>
            </div>
          </div>

          {/* Notch divider */}
          <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
            <div
              style={{
                position: "absolute", left: -14, width: 28, height: 28,
                borderRadius: 9999, background: "var(--color-bg-base)",
                border: "1px solid var(--color-border-subtle)",
              }}
            />
            <hr className="ticket-dash" style={{ flex: 1, margin: "0 14px" }} />
            <div
              style={{
                position: "absolute", right: -14, width: 28, height: 28,
                borderRadius: 9999, background: "var(--color-bg-base)",
                border: "1px solid var(--color-border-subtle)",
              }}
            />
          </div>

          {/* Ticket details grid */}
          <div style={{ padding: "4px 20px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px", marginBottom: 20 }}>
              <TicketField label="Date" value={event.date} />
              <TicketField label="Time" value={event.time} />
              <TicketField label="Location" value={event.city} />
              <TicketField label="Seats" value={event.seats ?? "General"} />
              <TicketField label="Ticket holder" value="Alex Smith" />
              <TicketField label="Issued to" value="ID: 1235-9889" />
            </div>

            {/* Category chip */}
            <div style={{ marginBottom: 20 }}>
              <span
                style={{
                  background: "var(--color-accent-dim)",
                  border: "1px solid var(--color-border-active)",
                  borderRadius: 9999,
                  padding: "4px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--color-accent)",
                }}
              >
                {event.section ?? "General"}
              </span>
            </div>

            {/* Second dashed divider */}
            <hr className="ticket-dash" style={{ marginBottom: 20 }} />

            {/* Booking code + barcode */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Booking Code
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 600, letterSpacing: "0.04em" }}>
                  GTT21738745123
                </p>
                <div
                  style={{
                    background: "var(--color-accent)",
                    borderRadius: 9999,
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {event.price}
                </div>
              </div>
            </div>

            {/* Barcode */}
            <Barcode />
          </div>
        </div>
      )}

      {/* View all tickets link */}
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
          Looking for more?{" "}
          <Link href="/explore" style={{ color: "var(--color-accent)", fontWeight: 600 }}>
            Explore Events
          </Link>
        </p>
      </div>
    </div>
  );
}

function TicketField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 10, color: "var(--color-text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</p>
    </div>
  );
}

function Barcode() {
  const bars = Array.from({ length: 52 }, (_, i) => ({
    width: [1, 2, 1, 3, 1, 2, 2, 1, 3, 1][i % 10],
    dark: i % 3 !== 2,
  }));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        height: 56,
        gap: 2,
        padding: "0 4px",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          style={{
            flex: bar.width,
            background: bar.dark ? "var(--color-text-secondary)" : "transparent",
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}
