"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Calendar, Clock, MapPin, User } from "lucide-react";
import { getTicketById, type SavedTicket } from "../../lib/tickets";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<SavedTicket | null>(null);
  const [loaded, setLoaded]  = useState(false);

  useEffect(() => {
    setTicket(getTicketById(id) ?? null);
    setLoaded(true);
  }, [id]);

  if (!loaded) return null;

  if (!ticket) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--color-text-muted)", marginBottom: 16 }}>Ticket not found</p>
        <Link href="/tickets" style={{ color: "var(--color-accent)" }}>Back to tickets</Link>
      </div>
    );
  }

  return (
    <div className="page-root"><div className="page-narrow">
      {/* Header */}
      <div style={{ padding: "52px 20px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link
          href="/tickets"
          style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ArrowLeft size={18} color="#fff" strokeWidth={2} />
        </Link>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>My Ticket</h1>
        <button style={{
          width: 40, height: 40, borderRadius: 9999,
          background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <Share2 size={16} color="var(--color-text-secondary)" strokeWidth={1.8} />
        </button>
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* ── Boarding pass card ── */}
        <div style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: 24, overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
        }}>

          {/* Event image hero */}
          <div style={{ position: "relative", height: 180 }}>
            <img src={ticket.eventImage} alt={ticket.eventTitle}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,14,0.15) 0%, rgba(10,10,14,0.88) 100%)",
            }} />
            <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
              <span style={{
                fontSize: 9, fontWeight: 800, color: "var(--color-accent)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-active)",
                borderRadius: 9999, padding: "3px 10px",
              }}>
                {ticket.eventTag}
              </span>
              <h2 style={{
                fontSize: 18, fontWeight: 800, color: "#fff", marginTop: 6,
                lineHeight: 1.2, letterSpacing: "-0.02em",
              }}>
                {ticket.eventTitle}
              </h2>
            </div>
          </div>

          {/* Notch cutout divider */}
          <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
            <div style={{
              position: "absolute", left: -14, width: 28, height: 28,
              borderRadius: 9999, background: "var(--color-bg-base)",
            }} />
            <hr className="ticket-dash" style={{ flex: 1, margin: "0 14px" }} />
            <div style={{
              position: "absolute", right: -14, width: 28, height: 28,
              borderRadius: 9999, background: "var(--color-bg-base)",
            }} />
          </div>

          {/* Ticket details */}
          <div style={{ padding: "4px 18px 20px" }}>

            {/* Info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px", marginBottom: 16 }}>
              <InfoField icon={<Calendar size={12} color="var(--color-accent)" />} label="Date"    value={ticket.eventDate} />
              <InfoField icon={<Clock size={12} color="var(--color-accent)" />}    label="Time"    value={ticket.eventTime} />
              <InfoField icon={<MapPin size={12} color="var(--color-accent)" />}   label="Venue"   value={ticket.eventLocation.split(",")[0]!} />
              <InfoField icon={<User size={12} color="var(--color-accent)" />}     label="Ticket"  value={`${ticket.quantity}× ${ticket.ticketType}`} />
            </div>

            {/* Attendee row */}
            <div style={{
              background: "var(--color-bg-card)", border: "1px solid var(--color-border-subtle)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 16,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  Attendee
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{ticket.attendeeName}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  Total Paid
                </p>
                <p style={{ fontSize: 14, fontWeight: 800, color: "var(--color-accent)" }}>
                  ₹{ticket.totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Dashed divider */}
            <hr className="ticket-dash" style={{ marginBottom: 16 }} />

            {/* Booking ref + barcode */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                    Booking Ref
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "0.06em" }}>
                    {ticket.bookingRef}
                  </p>
                </div>
                <span style={{
                  background: "var(--color-accent)", borderRadius: 9999,
                  padding: "6px 14px", fontSize: 12, fontWeight: 700, color: "#fff",
                }}>
                  ₹{ticket.totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <Barcode />
            </div>

            {/* QR code */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${ticket.bookingRef}&margin=0`}
                  alt="QR Code"
                  width={130} height={130}
                  style={{ display: "block", borderRadius: 4 }}
                />
              </div>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Scan at entry</p>
            </div>

            {/* Confirmed badge */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              padding: "10px", background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.22)", borderRadius: 9999,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 9999, background: "var(--color-success)" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-success)" }}>
                Confirmed · Valid for entry
              </span>
            </div>
          </div>
        </div>

        {/* View event link */}
        <Link
          href={`/events/${ticket.eventId}`}
          style={{
            display: "block", textAlign: "center", marginTop: 18,
            fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none",
          }}
        >
          View Event Details →
        </Link>
      </div>
    </div></div>
  );
}

function InfoField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
        {icon}
        <span style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{value}</p>
    </div>
  );
}

function Barcode() {
  const bars = Array.from({ length: 52 }, (_, i) => ({
    width: [1, 2, 1, 3, 1, 2, 2, 1, 3, 1][i % 10],
    dark:  i % 3 !== 2,
  }));
  return (
    <div style={{ display: "flex", alignItems: "stretch", height: 52, gap: 2, padding: "0 4px", borderRadius: 8, overflow: "hidden" }}>
      {bars.map((bar, i) => (
        <div key={i} style={{ flex: bar.width, background: bar.dark ? "var(--color-text-secondary)" : "transparent", borderRadius: 1 }} />
      ))}
    </div>
  );
}
