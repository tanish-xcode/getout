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
  imageMobile?: string;
  imagePosition?: string;
  portrait?: boolean;
  attendees: number;
  tag: string;
  category: "All" | "Concerts" | "Festivals" | "Comedy" | "Nightlife" | "Conferences" | "Dining" | "Sports" | "Religious";
  description: string;
  organizer: string;
  featured?: boolean;
  seats?: string;
  section?: string;
};

export const events: Event[] = [
  {
    id: "bhajan-karo-shiva-night",
    title: "Bhajan Karo — Shiva Night",
    subtitle: "Devotional · Gajendra Pratap Singh · Live",
    location: "TGRTC Kalabhavan",
    city: "Hyderabad",
    date: "12 June 2026",
    time: "7:00 PM",
    price: "₹500",
    priceNum: 500,
    image: "/shiva-bhajan.png",
    portrait: true,
    featured: true,
    attendees: 679,
    tag: "Concert",
    category: "Religious",
    description: "Bhajan Karo presents a special Shiva Night at TGRTC Kalabhavan, featuring the renowned vocalist Gajendra Pratap Singh. An evening of powerful devotional music dedicated to Lord Shiva — from deep classical bhajans to high-energy renditions that fill the hall with divine energy. Come as you are, leave transformed.",
    organizer: "Get Out",
    seats: "Tiered Seating",
    section: "Auditorium",
  },
  {
    id: "band-sumiran-jamming-3",
    title: "Band Sumiran — Bhajan Jamming 3.0",
    subtitle: "Bhajan · Live Band · Jamming",
    location: "Rangbhoomi Spaces & Events",
    city: "Hyderabad",
    date: "14 June 2026",
    time: "6:30 PM",
    price: "₹449",
    priceNum: 449,
    image: "/bhajan-clubbing.jpg",
    portrait: true,
    featured: true,
    attendees: 200,
    tag: "Concert",
    category: "Religious",
    description: "The third edition of Band Sumiran's signature Bhajan Jamming series returns to Rangbhoomi Spaces & Events. An intimate evening of live bhajan performances where the band blends traditional devotional music with spontaneous jamming and improvisation — expect raw energy, heartfelt renditions, and a crowd that sings along.",
    organizer: "Get Out",
    seats: "General Entry",
    section: "Open Floor",
  },
];

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getEventsByCategory(category: string): Event[] {
  if (category === "All") return events;
  return events.filter((e) => e.category === category);
}

export const categories = ["All", "Concerts", "Festivals", "Comedy", "Nightlife", "Conferences", "Dining", "Sports", "Religious"] as const;
