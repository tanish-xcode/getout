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
    attendees: 1200,
    tag: "Conference",
    category: "Conferences",
    description: "AI Global Leadership Future Summit unites global leaders to explore innovation, share insights, and shape the future of technology worldwide. Featuring keynotes from top CEOs, live demos, and interactive workshops.",
    organizer: "TechWorld India",
    featured: true,
    seats: "Section A · Row 3",
    section: "General",
  },
  {
    id: "arijit-singh-live",
    title: "Arijit Singh Live In Concert",
    subtitle: "Concert",
    location: "GMC Balayogi Athletic Stadium",
    city: "Hyderabad",
    date: "12 July 2026",
    time: "7:30 PM",
    price: "₹1,800",
    priceNum: 1800,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    attendees: 8500,
    tag: "Concert",
    category: "Concerts",
    description: "Experience the magic of Arijit Singh's soulful voice live. One of India's most beloved artists brings his iconic hits to an unforgettable night under the stars.",
    organizer: "BookMyShow Live",
    seats: "Pit Area",
    section: "Standing",
  },
  {
    id: "sunburn-festival",
    title: "Sunburn Festival 2026",
    subtitle: "Festival",
    location: "Vagator Beach",
    city: "Goa",
    date: "30 July 2026",
    time: "4:00 PM",
    price: "₹3,999",
    priceNum: 3999,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    attendees: 15000,
    tag: "Festival",
    category: "Festivals",
    description: "Asia's biggest music festival returns to Goa. Three days of world-class DJs, immersive art installations, gourmet food, and non-stop dancing on the beach.",
    organizer: "Percept Live",
    seats: "Festival Grounds",
    section: "General",
  },
  {
    id: "comedy-zakir-khan",
    title: "Comedy Nights with Zakir Khan",
    subtitle: "Comedy",
    location: "Shilpakala Vedika",
    city: "Hyderabad",
    date: "8 June 2026",
    time: "8:00 PM",
    price: "₹999",
    priceNum: 999,
    image: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800&q=80",
    attendees: 450,
    tag: "Comedy",
    category: "Comedy",
    description: "An evening of laughs with India's most loved standup comedian. Zakir Khan brings his signature 'Sakht Launda' energy to a new show filled with relatable stories and sharp wit.",
    organizer: "OML Entertainment",
    seats: "Balcony · Row B",
    section: "Premium",
  },
  {
    id: "techno-underground",
    title: "Techno Underground Rave",
    subtitle: "Nightlife",
    location: "Hyatt Regency Basement",
    city: "Hyderabad",
    date: "14 June 2026",
    time: "11:00 PM",
    price: "₹599",
    priceNum: 599,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
    attendees: 800,
    tag: "Nightlife",
    category: "Nightlife",
    description: "Lose yourself in the underground techno scene. Featuring three floors of music, world-class sound systems, and headlining sets from Berlin's finest DJs.",
    organizer: "Subculture India",
    seats: "General Entry",
    section: "Dance Floor",
  },
  {
    id: "jazz-dine",
    title: "Jazz & Dine Evening",
    subtitle: "Dining",
    location: "ITC Kakatiya",
    city: "Hyderabad",
    date: "22 June 2026",
    time: "7:00 PM",
    price: "₹1,200",
    priceNum: 1200,
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    attendees: 120,
    tag: "Dining",
    category: "Dining",
    description: "An intimate evening of jazz and fine dining. Savor a curated 5-course meal while the city's finest jazz quartet performs live. A perfect night for music lovers and food enthusiasts.",
    organizer: "The Taj Group",
    seats: "Table 12",
    section: "Main Hall",
  },
  {
    id: "ipl-csk-vs-mi",
    title: "IPL 2026: CSK vs MI",
    subtitle: "Sports",
    location: "MA Chidambaram Stadium",
    city: "Chennai",
    date: "5 June 2026",
    time: "7:30 PM",
    price: "₹500",
    priceNum: 500,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    attendees: 50000,
    tag: "Sports",
    category: "Sports",
    description: "The biggest rivalry in IPL — Chennai Super Kings take on Mumbai Indians in what promises to be an electrifying clash. Book your seats before they sell out!",
    organizer: "BCCI",
    seats: "Stand C · Row 10",
    section: "North Stand",
  },
  {
    id: "diljit-dosanjh-tour",
    title: "Diljit Dosanjh World Tour",
    subtitle: "Concert",
    location: "Gachibowli Indoor Stadium",
    city: "Hyderabad",
    date: "18 July 2026",
    time: "8:00 PM",
    price: "₹2,200",
    priceNum: 2200,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    attendees: 12000,
    tag: "Concert",
    category: "Concerts",
    description: "Diljit Dosanjh brings his massive world tour to India. Expect an epic night of Punjabi hits, high energy performances, and an unforgettable production.",
    organizer: "Live Nation India",
    seats: "Lower Bowl",
    section: "Section B",
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
