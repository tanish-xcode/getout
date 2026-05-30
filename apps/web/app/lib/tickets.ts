export type SavedTicket = {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventCity: string;
  eventImage: string;
  eventTag: string;
  bookingRef: string;
  ticketType: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchasedAt: string;
  attendeeName: string;
};

function storageKey(email?: string | null) {
  return email ? `getout_tickets_${email}` : "getout_tickets";
}

export function getAllTickets(email?: string | null): SavedTicket[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(storageKey(email)) || "[]");
  } catch {
    return [];
  }
}

export function getTicketById(id: string, email?: string | null): SavedTicket | undefined {
  return getAllTickets(email).find((t) => t.id === id);
}

export function saveTicket(ticket: SavedTicket, email?: string | null): void {
  const all = getAllTickets(email).filter((t) => t.id !== ticket.id);
  localStorage.setItem(storageKey(email), JSON.stringify([ticket, ...all]));
}

export function generateTicketId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "GET";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}
