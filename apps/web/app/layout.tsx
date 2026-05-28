import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import DesktopNav from "./components/DesktopNav";

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

        {/* Desktop top navigation — hidden on mobile via CSS */}
        <DesktopNav />

        <div className="mobile-container">
          {/* Smooth ambient gradient — fixed full-page, no visible blob circles */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
            background: [
              "radial-gradient(ellipse 100% 55% at 90% 0%,   rgba(242,107,58,0.18) 0%, transparent 60%)",
              "radial-gradient(ellipse 70%  80% at -8% 50%,  rgba(236,72,153,0.08) 0%, transparent 55%)",
              "radial-gradient(ellipse 80%  50% at 55% 105%, rgba(242,107,58,0.11) 0%, transparent 55%)",
            ].join(", "),
          }} />

          {/* All page content — content-frame adds padding-top on desktop for the nav */}
          <div className="content-frame" style={{ position: "relative", zIndex: 1 }}>
            {children}
            <BottomNav />
          </div>
        </div>

      </body>
    </html>
  );
}
