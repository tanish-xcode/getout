export type Event = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  date: string;
  time: string;
  price: string;
  priceNum: number;
  image: string;
  attendees: number;
  tag: string;
  category: "All" | "Concerts" | "Festivals" | "Comedy" | "Nightlife" | "Conferences" | "Dining" | "Sports";
  description: string;
  organizer: string;
  featured?: boolean;
  seats?: string;
  section?: string;
};

export const events: Event[] = [
  {
    id: "ai-global-summit",
    title: "AI Global Leadership Future Summit",
    subtitle: "Featured · Conference",
    location: "Hyderabad International Convention Centre",
    city: "Hyderabad",
    date: "25 June 2026",
    time: "10:00 AM",
    price: "₹2,500",
    priceNum: 2500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    attendees: 3200,
    tag: "Conference",
    category: "Conferences",
    description: "AI Global Leadership Future Summit unites global leaders to explore innovation, share insights, and shape the future of technology worldwide. Featuring keynotes from top CEOs, live demos, and interactive workshops.",
    organizer: "TechWorld India",
    featured: true,
    seats: "Section A · Row 3",
    section: "General",
  },
  {
    id: "bhajan-clubbing-night",
    title: "Bhajan Clubbing Night",
    subtitle: "Kirtan · Electronic Bass · Nightlife",
    location: "10D The Club, Jubilee Hills",
    city: "Hyderabad",
    date: "21 June 2026",
    time: "10:00 PM",
    price: "₹1,200",
    priceNum: 1200,
    image: "/bhajan-clubbing.jpg",
    attendees: 1800,
    tag: "Nightlife",
    category: "Nightlife",
    description: "Close your eyes. Is that a tabla or a kick drum? At Bhajan Clubbing Night, ancient devotion and deep electronic sound collapse into one unforgettable experience. Classic kirtans ride pulsing basslines, sacred hymns hit on the drop, and for one night only, 10D The Club becomes a temple. Your gods approve. Dress code: sacred chaos.",
    organizer: "Get Out",
    featured: true,
    seats: "General Entry",
    section: "Dance Floor",
  },
];

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getEventsByCategory(category: string): Event[] {
  if (category === "All") return events;
  return events.filter((e) => e.category === category);
}

export const categories = ["All", "Concerts", "Festivals", "Comedy", "Nightlife", "Conferences", "Dining", "Sports"] as const;
