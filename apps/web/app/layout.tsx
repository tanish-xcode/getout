import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import DesktopNav from "./components/DesktopNav";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./components/AuthProvider";

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
};

// Runs synchronously before React hydrates — no flash of wrong theme
const themeInitScript = `(function(){
  var L={
    '--color-bg-base':'#FFF9F6','--color-bg-surface':'#FFFFFF','--color-bg-card':'#FFFFFF',
    '--color-bg-card-hover':'#FFF4EE','--color-text-primary':'#0F0F1A',
    '--color-text-secondary':'#4A4A60','--color-text-muted':'#8888A0',
    '--color-border-subtle':'rgba(0,0,0,0.06)','--color-border':'rgba(0,0,0,0.10)',
    '--color-border-active':'rgba(242,107,58,0.45)','--color-accent-dim':'rgba(242,107,58,0.12)',
    '--color-accent-dim-strong':'rgba(242,107,58,0.22)','--shadow-card':'0 4px 24px rgba(0,0,0,0.08)',
    '--shadow-card-hover':'0 8px 32px rgba(0,0,0,0.14)','--shadow-accent-glow':'0 0 32px rgba(242,107,58,0.22)',
    '--shadow-nav':'0 8px 40px rgba(0,0,0,0.12)','--color-nav-bg':'rgba(255,249,246,0.90)',
    '--color-search-input-bg':'#FFFFFF','--dot-inactive':'rgba(0,0,0,0.20)'
  };
  function apply(t){
    document.documentElement.setAttribute('data-theme',t);
    var s=document.getElementById('go-theme-vars');
    if(!s){s=document.createElement('style');s.id='go-theme-vars';document.head.appendChild(s);}
    s.textContent=t==='light'?':root{'+Object.keys(L).map(function(k){return k+':'+L[k]}).join(';')+'}':'';
    document.dispatchEvent(new CustomEvent('go-theme-change',{detail:t}));
  }
  window.__goApplyTheme=apply;
  window.__goToggleTheme=function(){
    var n=(localStorage.getItem('go-theme')||'dark')==='dark'?'light':'dark';
    localStorage.setItem('go-theme',n);
    apply(n);
  };
  apply(localStorage.getItem('go-theme')||'dark');
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={jakarta.className}>
        <AuthProvider>
        <ThemeProvider>
          <DesktopNav />

          <div className="mobile-container">
            <div style={{
              position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
              background: [
                "radial-gradient(ellipse 100% 55% at 90% 0%,   rgba(242,107,58,0.15) 0%, transparent 60%)",
                "radial-gradient(ellipse 70%  80% at -8% 50%,  rgba(236,72,153,0.07) 0%, transparent 55%)",
                "radial-gradient(ellipse 80%  50% at 55% 105%, rgba(242,107,58,0.09) 0%, transparent 55%)",
              ].join(", "),
            }} />

            <div className="content-frame" style={{ position: "relative", zIndex: 1 }}>
              {children}
              <BottomNav />
            </div>
          </div>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
