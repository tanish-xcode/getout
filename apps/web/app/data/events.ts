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
    id: "paata-saala",
    title: "Paata Shala",
    subtitle: "Telugu Folk · Live Music · All Ages",
    location: "Gachibowli Indoor Stadium",
    city: "Hyderabad",
    date: "7 June 2026",
    time: "5:45 PM",
    price: "₹150",
    priceNum: 150,
    image: "/paata-shala.jpg",
    attendees: 5000,
    tag: "Concert",
    category: "Concerts",
    description: "Paata Saala is a celebration of Telugu folk and classical music, bringing together some of Hyderabad's finest artists for an evening of soulful live performances at Gachibowli Indoor Stadium. Expect a rich blend of traditional songs, folk compositions, and live arrangements that pay homage to the roots of Telugu music culture — a night for the whole family.",
    organizer: "Get Out",
    seats: "Open Seating",
    section: "Ground Floor",
  },
  {
    id: "paadu-bros-90s-night",
    title: "Paadu Bros — 90s Musical Night",
    subtitle: "90s Hits · Live Band · Nostalgia",
    location: "Akan Hyderabad",
    city: "Hyderabad",
    date: "7 June 2026",
    time: "8:15 PM",
    price: "₹799",
    priceNum: 799,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
    attendees: 400,
    tag: "Concert",
    category: "Concerts",
    description: "Paadu Bros bring back the golden era of 90s music with a live performance night that will have you singing along from start to finish. Held at Akan Hyderabad, expect an electrifying setlist of iconic hits from the decade — reimagined and delivered live with full band energy. Pure nostalgia, all night long.",
    organizer: "Get Out",
    seats: "General Entry",
    section: "Standing",
  },
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
    image: "/shiva bhajan.png",
    attendees: 679,
    tag: "Concert",
    category: "Concerts",
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
    imagePosition: "center 35%",
    attendees: 200,
    tag: "Concert",
    category: "Concerts",
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

export const categories = ["All", "Concerts", "Festivals", "Comedy", "Nightlife", "Conferences", "Dining", "Sports"] as const;
