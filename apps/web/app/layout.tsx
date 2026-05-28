import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Get Out — Find Events In Your City",
  description: "Discover the best events, concerts, dining, and nightlife near you.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0A0E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jakarta.className} style={{ backgroundColor: "#0A0A0E" }}>
        <div className="mobile-container">
          {/* Top blobs — absolute, scroll with page */}
          <div className="bg-blob-orange" style={{ width: 340, height: 340, top: -80, right: -100 }} />
          <div className="bg-blob-rose"   style={{ width: 260, height: 260, top: 180, left: -80 }} />

          {/* Bottom blobs — fixed to viewport so always visible */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
            maxWidth: 430, margin: "0 auto",
          }}>
            <div style={{
              position: "absolute", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(242,107,58,0.42) 0%, rgba(242,107,58,0) 70%)",
              width: 380, height: 380, bottom: -60, right: -100,
            }} />
            <div style={{
              position: "absolute", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(236,72,153,0.22) 0%, rgba(236,72,153,0) 70%)",
              width: 280, height: 280, bottom: 160, left: -80,
            }} />
          </div>

          {/* Page content stacks above blobs */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {children}
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
