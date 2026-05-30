"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ticket as TicketIcon, ChevronRight, MapPin, LogIn, UserPlus } from "lucide-react";
import { getAllTickets, type SavedTicket } from "../lib/tickets";
import { useAuth } from "../components/AuthProvider";

export default function TicketsPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SavedTicket[]>([]);

  useEffect(() => {
    if (user) {
      setTickets(getAllTickets(user.email));
    } else {
      setTickets([]);
    }
  }, [user]);

  // ── Not logged in (or still loading) ─────────────────────────
  if (!user) {
    return (
      <div className="page-root"><div className="page-narrow">
        <div style={{ padding: "52px 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/" style={{
            width: 40, height: 40, borderRadius: 9999,
            background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>My Tickets</h1>
        </div>

        {/* Auth gate */}
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 9999,
            background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <TicketIcon size={32} color="var(--color-accent)" strokeWidth={1.8} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
            Your tickets live here
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginBottom: 32, lineHeight: 1.6 }}>
            Sign in to see all your event bookings in one place. Every ticket stays safely linked to your account.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/sign-in" style={{
              height: 52, borderRadius: 16,
              background: "var(--color-accent)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 15, fontWeight: 800, color: "#fff",
              textDecoration: "none",
              boxShadow: "0 0 28px rgba(242,107,58,0.40)",
            }}>
              <LogIn size={18} strokeWidth={2} />
              Sign In
            </Link>
            <Link href="/sign-up" style={{
              height: 52, borderRadius: 16,
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)",
              textDecoration: "none",
            }}>
              <UserPlus size={18} strokeWidth={2} />
              Create Account
            </Link>
          </div>
        </div>
      </div></div>
    );
  }

  // ── Logged in ────────────────────────────────────────────────
  return (
    <div className="page-root"><div className="page-narrow">
      {/* Header */}
      <div style={{ padding: "52px 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <Link href="/" style={{
          width: 40, height: 40, borderRadius: 9999,
          background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
        </Link>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>My Tickets</h1>
          {tickets.length > 0 && (
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 1 }}>
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {tickets.length === 0 ? (
        /* Empty state */
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 9999,
            background: "var(--color-accent-dim)", border: "1px solid var(--color-border-active)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <TicketIcon size={28} color="var(--color-accent)" strokeWidth={1.8} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 6 }}>No tickets yet</p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 28 }}>
            Your purchased tickets will appear here
          </p>
          <Link href="/explore" style={{
            background: "var(--color-accent)", color: "#fff",
            borderRadius: 9999, padding: "12px 28px",
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 0 20px rgba(242,107,58,0.35)",
            display: "inline-block",
          }}>
            Explore Events
          </Link>
        </div>
      ) : (
        /* Ticket list */
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
          {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/tickets/${ticket.id}`} style={{ textDecoration: "none" }}>
              <div className="pressable" style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden", display: "flex",
              }}>
                <div style={{ position: "relative", width: 96, flexShrink: 0 }}>
                  <img src={ticket.eventImage} alt={ticket.eventTitle} style={{ width: 96, height: 96, objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(19,19,26,0.6) 100%)" }} />
                </div>
                <div style={{ padding: "12px 12px 12px 14px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 3 }}>
                      {ticket.eventTitle}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={10} color="var(--color-text-muted)" strokeWidth={2} />
                      <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                        {ticket.eventDate} · {ticket.eventCity}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.30)",
                        borderRadius: 9999, padding: "2px 8px",
                        fontSize: 10, fontWeight: 700, color: "#4ADE80",
                      }}>
                        Confirmed
                      </span>
                      <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
                        {ticket.quantity}× {ticket.ticketType}
                      </span>
                    </div>
                    <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div></div>
  );
}
