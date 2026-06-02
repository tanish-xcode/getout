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
    id: "hyderabad-comedy-factory",
    title: "Hyderabad Comedy Factory",
    subtitle: "Stand-up · Open Mic",
    location: "The Moonshine Project, Banjara Hills",
    city: "Hyderabad",
    date: "14 June 2026",
    time: "7:30 PM",
    price: "₹499",
    priceNum: 499,
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
    attendees: 320,
    tag: "Comedy",
    category: "Comedy",
    description: "Hyderabad's hottest comedy showcase returns! Six of the city's funniest stand-up comedians bring their A-game for a night of unfiltered laughs. Open bar till 9 PM.",
    organizer: "Get Out",
    featured: false,
    seats: "General",
    section: "Floor",
  },
  {
    id: "biryani-beyond-food-fest",
    title: "Biryani & Beyond Food Festival",
    subtitle: "Culinary · Street Food",
    location: "Necklace Road Grounds",
    city: "Hyderabad",
    date: "28 June 2026",
    time: "12:00 PM",
    price: "₹350",
    priceNum: 350,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    attendees: 5000,
    tag: "Dining",
    category: "Dining",
    description: "50+ food stalls, 200+ dishes, one epic Saturday. From legendary dum biryani to experimental fusion — Hyderabad's biggest food festival is back.",
    organizer: "Get Out",
    featured: false,
    seats: "General Entry",
    section: "All Areas",
  },
  {
    id: "monsoon-indie-night",
    title: "Monsoon Indie Night",
    subtitle: "Live Music · Indie",
    location: "Hard Rock Cafe, Banjara Hills",
    city: "Hyderabad",
    date: "5 July 2026",
    time: "8:00 PM",
    price: "₹800",
    priceNum: 800,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b4f5e62?w=800&q=80",
    attendees: 600,
    tag: "Concerts",
    category: "Concerts",
    description: "Three of Hyderabad's best indie acts take the stage on the first rainy Saturday of the season. Featuring surprise headliners and rooftop sessions.",
    organizer: "Get Out",
    featured: false,
    seats: "General",
    section: "Standing",
  },
  {
    id: "hyd-startup-pitch-night",
    title: "Hyd Startup Pitch Night",
    subtitle: "Networking · Venture",
    location: "T-Hub, Madhapur",
    city: "Hyderabad",
    date: "18 June 2026",
    time: "6:00 PM",
    price: "Free",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    attendees: 450,
    tag: "Conference",
    category: "Conferences",
    description: "10 startups. 3 minutes each. Real investors in the room. Hyderabad's most high-stakes pitch night returns with ₹10L in prize money on the table.",
    organizer: "Get Out",
    featured: false,
    seats: "General",
    section: "Auditorium",
  },
  {
    id: "sunday-cricket-league",
    title: "Sunday Premier Cricket League",
    subtitle: "Sports · Cricket",
    location: "Lal Bahadur Stadium",
    city: "Hyderabad",
    date: "22 June 2026",
    time: "9:00 AM",
    price: "₹200",
    priceNum: 200,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    attendees: 1200,
    tag: "Sports",
    category: "Sports",
    description: "8 teams, round-robin format, BBQ in the stands. Register your team or buy spectator passes — limited spots available.",
    organizer: "Get Out",
    featured: false,
    seats: "Spectator",
    section: "East Stand",
  },
  {
    id: "bhajan-clubbing-night",
    title: "Bhajan Clubbing Night",
    subtitle: "Sacred Bass · Nightlife",
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
    description: "Where devotion meets the dancefloor. Hyderabad's most unique night out fuses classic bhajans with deep electronic beats — your gods are watching and they want you to dance. Dress code: sacred chaos.",
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
