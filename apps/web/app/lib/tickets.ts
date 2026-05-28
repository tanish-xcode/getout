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

const KEY = "getout_tickets";

export function getAllTickets(): SavedTicket[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function getTicketById(id: string): SavedTicket | undefined {
  return getAllTickets().find((t) => t.id === id);
}

export function saveTicket(ticket: SavedTicket): void {
  const all = getAllTickets().filter((t) => t.id !== ticket.id);
  localStorage.setItem(KEY, JSON.stringify([ticket, ...all]));
}

export function generateTicketId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "GET";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}
