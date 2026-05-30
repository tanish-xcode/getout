"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Minus, Plus, Zap, MapPin, Calendar, LogIn } from "lucide-react";
import { getEventById } from "../../data/events";
import { saveTicket, generateTicketId, type SavedTicket } from "../../lib/tickets";
import { useAuth } from "../../components/AuthProvider";

const TICKET_TYPES = [
  { label: "General Entry", desc: "Access to all sessions",           multiplier: 1.0 },
  { label: "Premium",       desc: "Front section · Priority entry",   multiplier: 1.5 },
  { label: "VIP",           desc: "VIP lounge · Backstage access",    multiplier: 2.0 },
];

export default function CheckoutPage() {
  const { id: eventId } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const event = getEventById(eventId);

  const [typeIdx, setTypeIdx]     = useState(0);
  const [quantity, setQuantity]   = useState(1);
  const [confirming, setConfirming] = useState(false);

  const isBhajan = eventId === "bhajan-clubbing-night";
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBhajan || !embedRef.current) return;
    const script = document.createElement("script");
    script.src = "https://eventdesk.app/embed.js";
    script.setAttribute("data-url", "https://eventdesk.app/events/bhajan-clubbing/register?embed&tickets=cec88f7e-7552-4a44-b92a-6be011182258&pbg=transparent&cbg=transparent&sbg=transparent&tcbg=transparent&etcol=fffafa&mtcol=fffafa&tctcol=ffffff&bcol=fd8d0d");
    script.setAttribute("data-page-bg",       "transparent");
    script.setAttribute("data-card-bg",       "transparent");
    script.setAttribute("data-summary-bg",    "transparent");
    script.setAttribute("data-ticket-card-bg","transparent");
    script.setAttribute("data-event-text-color", "fffafa");
    script.setAttribute("data-main-text-color",  "fffafa");
    script.setAttribute("data-card-text-color",  "ffffff");
    script.setAttribute("data-btn-color",     "fd8d0d");
    embedRef.current.appendChild(script);
    return () => { script.remove(); };
  }, [isBhajan]);

  if (!event) {
    return (
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <p style={{ color: "var(--color-text-muted)", marginBottom: 16 }}>Event not found</p>
        <Link href="/" style={{ color: "var(--color-accent)" }}>Go Home</Link>
      </div>
    );
  }

  const selectedType = TICKET_TYPES[typeIdx]!;
  const unitPrice = Math.round(event.priceNum * selectedType.multiplier);
  const total     = unitPrice * quantity;
  const ev = event;

  function handleConfirm() {
    if (!user) { router.push("/sign-in"); return; }
    setConfirming(true);
    const ticketId = generateTicketId();
    const ticket: SavedTicket = {
      id:            ticketId,
      eventId:       ev.id,
      eventTitle:    ev.title,
      eventDate:     ev.date,
      eventTime:     ev.time,
      eventLocation: ev.location,
      eventCity:     ev.city,
      eventImage:    ev.image,
      eventTag:      ev.tag,
      bookingRef:    ticketId,
      ticketType:    selectedType.label,
      quantity,
      unitPrice,
      totalPrice:    total,
      purchasedAt:   new Date().toISOString(),
      attendeeName:  user.name,
    };
    saveTicket(ticket, user.email);
    router.push(`/tickets/${ticketId}`);
  }

  return (
    <div className="page-root">
      <div className="page-narrow">
      {/* Header */}
      <div style={{ padding: "52px 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <Link
          href={`/events/${ev.id}`}
          style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <ArrowLeft size={18} color="#fff" strokeWidth={2} />
        </Link>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Checkout</h1>
      </div>

      <div style={{ padding: "0 20px" }}>

        {/* ── Event summary ──────────────────────────────── */}
        <div style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          display: "flex",
          marginBottom: 24,
        }}>
          <img src={event.image} alt={event.title}
            style={{ width: 90, height: 90, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ padding: "12px 14px", flex: 1, minWidth: 0 }}>
            <span style={{
              fontSize: 9, fontWeight: 800, color: "var(--color-accent)",
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>{event.tag}</span>
            <p style={{
              fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 2, marginBottom: 6,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{event.title}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={10} color="var(--color-text-muted)" strokeWidth={2} />
                <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{event.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {event.location.split(",")[0]}, {event.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ticket type ────────────────────────────────── */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Select Ticket Type</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {TICKET_TYPES.map((type, i) => {
            const price  = Math.round(event.priceNum * type.multiplier);
            const active = typeIdx === i;
            return (
              <button
                key={i}
                onClick={() => setTypeIdx(i)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-lg)",
                  background: active ? "var(--color-accent-dim)" : "var(--color-bg-surface)",
                  border: active ? "1.5px solid var(--color-border-active)" : "1px solid var(--color-border-subtle)",
                  cursor: "pointer", transition: "all 150ms ease", textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 9999, flexShrink: 0,
                    border: active ? "none" : "1.5px solid var(--color-border)",
                    background: active ? "var(--color-accent)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {active && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : "var(--color-text-secondary)" }}>
                      {type.label}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1 }}>{type.desc}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, fontWeight: 800, color: active ? "var(--color-accent)" : "#fff" }}>
                  ₹{price.toLocaleString("en-IN")}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Quantity ───────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-lg)",
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Quantity</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              style={{
                width: 32, height: 32, borderRadius: 9999,
                background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: quantity <= 1 ? "default" : "pointer", opacity: quantity <= 1 ? 0.4 : 1,
              }}
            >
              <Minus size={14} color="var(--color-accent)" strokeWidth={2.5} />
            </button>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", minWidth: 20, textAlign: "center" }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => Math.min(6, q + 1))}
              style={{
                width: 32, height: 32, borderRadius: 9999,
                background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: quantity >= 6 ? "default" : "pointer", opacity: quantity >= 6 ? 0.4 : 1,
              }}
            >
              <Plus size={14} color="var(--color-accent)" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ── Order summary ──────────────────────────────── */}
        <div style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          borderRadius: "var(--radius-lg)",
          padding: "16px",
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
            Order Summary
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              {quantity}× {selectedType.label}
            </span>
            <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Convenience fee</span>
            <span style={{ fontSize: 13, color: "var(--color-success)", fontWeight: 600 }}>FREE</span>
          </div>
          <div style={{ borderTop: "1px solid var(--color-border-subtle)", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--color-accent)" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* ── Checkout ── */}
        {isBhajan ? (
          <div ref={embedRef} style={{ marginBottom: 20 }} />
        ) : (
          <div style={{
            background: "rgba(242,107,58,0.05)",
            border: "1.5px dashed var(--color-border-active)",
            borderRadius: "var(--radius-xl)",
            padding: "18px 20px",
            marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--color-accent-dim)",
              border: "1px solid var(--color-border-active)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Zap size={16} color="var(--color-accent)" strokeWidth={2} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-accent)" }}>EventDesk Payment</p>
              <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 1, lineHeight: 1.4 }}>
                Secure checkout widget loads here after integration
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── Sign-in nudge (non-bhajan only) ── */}
      {!isBhajan && !user && (
        <div style={{ padding: "0 20px 16px" }}>
          <Link href="/sign-in" style={{
            width: "100%", height: 52, borderRadius: 16,
            background: "var(--color-accent)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontSize: 15, fontWeight: 800, color: "#fff",
            textDecoration: "none",
            boxShadow: "0 0 28px rgba(242,107,58,0.40)",
          }}>
            <LogIn size={18} strokeWidth={2} />
            Sign In to Book
          </Link>
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-text-muted)", marginTop: 8 }}>
            You need an account to save your tickets
          </p>
        </div>
      )}

      {/* ── Mock confirm (non-bhajan only) ── */}
      {!isBhajan && (
        <div style={{ padding: "0 20px 40px" }}>
          <button
            onClick={handleConfirm}
            disabled={confirming}
            style={{
              width: "100%", border: "none", cursor: confirming ? "default" : "pointer",
              background: confirming ? "var(--color-bg-card)" : "var(--color-accent)",
              color: "#fff", borderRadius: 9999, padding: "16px",
              fontSize: 15, fontWeight: 700,
              boxShadow: confirming ? "none" : "0 0 28px rgba(242,107,58,0.40)",
              transition: "all 200ms ease",
            }}
          >
            {confirming ? "Processing…" : `Confirm & Get Tickets · ₹${total.toLocaleString("en-IN")}`}
          </button>
        </div>
      )}
      </div>{/* end page-narrow */}
    </div>
  );
}
