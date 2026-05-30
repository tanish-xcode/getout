"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Phone, Ticket } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "../lib/firebase";

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{
      background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.30)",
      borderRadius: 12, padding: "10px 14px",
      fontSize: 13, color: "#F87171", fontWeight: 500,
    }}>{msg}</div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 9999,
      background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer",
    }}>
      <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
    </button>
  );
}

type View = "main" | "phone" | "otp";

const inputStyle: React.CSSProperties = {
  width: "100%", height: 50,
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  padding: "0 16px",
  fontSize: 15, color: "var(--color-text-primary)",
  fontFamily: "inherit", outline: "none",
  boxSizing: "border-box",
  transition: "border-color 150ms ease",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "var(--color-text-secondary)",
  textTransform: "uppercase", letterSpacing: "0.06em",
  display: "block", marginBottom: 6,
};

const primaryBtn: React.CSSProperties = {
  height: 52, borderRadius: 16, width: "100%",
  background: "var(--color-accent)", border: "none", cursor: "pointer",
  fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "inherit",
  boxShadow: "0 0 28px rgba(242,107,58,0.45)",
  transition: "all 200ms ease", letterSpacing: "-0.01em",
};

export default function SignInPage() {
  const router = useRouter();
  const { loginWithGoogle, login } = useAuth();

  const [view,    setView]    = useState<View>("main");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  // Email/password
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);

  // Phone / OTP
  const [phone, setPhone] = useState("");
  const [otp,   setOtp]   = useState("");
  const confirmRef    = useRef<ConfirmationResult | null>(null);
  const recaptchaRef  = useRef<RecaptchaVerifier | null>(null);

  function goBack() {
    setView("main");
    setError("");
    recaptchaRef.current?.clear();
    recaptchaRef.current = null;
  }

  // ── Google OAuth ─────────────────────────────────────────
  async function handleGoogle() {
    setLoading(true); setError("");
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.ok) router.push("/tickets");
    else setError(res.error ?? "Google sign-in failed.");
  }

  // ── Email sign-in ────────────────────────────────────────
  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) router.push("/tickets");
    else setError(res.error ?? "Something went wrong.");
  }

  // ── Send OTP ─────────────────────────────────────────────
  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) { setError("Enter a valid 10-digit number."); return; }
    setLoading(true); setError("");
    try {
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
        });
      }
      const confirmation = await signInWithPhoneNumber(auth, `+91${digits}`, recaptchaRef.current);
      confirmRef.current = confirmation;
      setLoading(false);
      setOtp("");
      setView("otp");
    } catch (err: unknown) {
      setLoading(false);
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
      setError(err instanceof Error ? err.message : "Failed to send OTP.");
    }
  }

  // ── Verify OTP ───────────────────────────────────────────
  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length < 4) { setError("Enter the OTP."); return; }
    if (!confirmRef.current) { setError("Session expired. Please try again."); setView("phone"); return; }
    setLoading(true); setError("");
    try {
      await confirmRef.current.confirm(otp);
      router.push("/tickets");
    } catch {
      setLoading(false);
      setError("Invalid OTP. Please try again.");
    }
  }

  const pageWrap: React.CSSProperties = {
    minHeight: "100svh", display: "flex", flexDirection: "column",
    background: "var(--color-bg-base)", padding: "0 24px",
    overflowY: "auto",
  };

  // ── Phone view ───────────────────────────────────────────
  if (view === "phone") return (
    <div style={pageWrap}>
      <div id="recaptcha-container" />
      <div style={{ paddingTop: 52, paddingBottom: 28 }}>
        <BackBtn onClick={goBack} />
      </div>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>
          Enter your mobile
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>
          We&apos;ll send a one-time code to verify
        </p>
      </div>
      <form onSubmit={handleSendOTP} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Mobile number</label>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              height: 50, borderRadius: 14, padding: "0 14px",
              background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
              fontSize: 14, color: "var(--color-text-primary)", whiteSpace: "nowrap",
            }}>
              🇮🇳 +91
            </div>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="98765 43210"
              autoFocus
              style={{ ...inputStyle, flex: 1 }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
              onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
            />
          </div>
        </div>
        {error && <ErrorBox msg={error} />}
        <button type="submit" disabled={loading} style={{
          ...primaryBtn,
          background: loading ? "var(--color-accent-dim)" : "var(--color-accent)",
          boxShadow: loading ? "none" : "0 0 28px rgba(242,107,58,0.45)",
          cursor: loading ? "not-allowed" : "pointer",
        }}>
          {loading ? "Sending…" : "Send OTP →"}
        </button>
      </form>
    </div>
  );

  // ── OTP view ─────────────────────────────────────────────
  if (view === "otp") {
    const masked = "+91 " + phone.slice(0, 5) + " " + phone.slice(5);
    return (
      <div style={pageWrap}>
        <div style={{ paddingTop: 52, paddingBottom: 28 }}>
          <BackBtn onClick={() => { setView("phone"); setError(""); }} />
        </div>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em" }}>
            Verify OTP
          </p>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginTop: 6 }}>
            Code sent to <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{masked}</span>
          </p>
        </div>
        <form onSubmit={handleVerifyOTP} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>One-time code</label>
            <input
              type="tel"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="· · · · · ·"
              autoFocus
              style={{ ...inputStyle, letterSpacing: "0.4em", fontSize: 24, textAlign: "center", fontWeight: 700 }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
              onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
            />
          </div>
          {error && <ErrorBox msg={error} />}
          <button type="submit" disabled={loading} style={{
            ...primaryBtn,
            background: loading ? "var(--color-accent-dim)" : "var(--color-accent)",
            boxShadow: loading ? "none" : "0 0 28px rgba(242,107,58,0.45)",
            cursor: loading ? "not-allowed" : "pointer",
          }}>
            {loading ? "Verifying…" : "Verify & Sign In"}
          </button>
        </form>
        <button type="button" onClick={() => { setView("phone"); setError(""); }} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-accent)", fontSize: 13, fontWeight: 600,
          marginTop: 16, fontFamily: "inherit", display: "block",
        }}>
          ← Change number
        </button>
      </div>
    );
  }

  // ── Main view ────────────────────────────────────────────
  return (
    <div style={pageWrap}>
      <div style={{ paddingTop: 52, paddingBottom: 28 }}>
        <Link href="/" style={{
          width: 40, height: 40, borderRadius: 9999,
          background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13,
          background: "var(--color-accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px rgba(242,107,58,0.45)",
        }}>
          <Ticket size={22} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Welcome back
          </p>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>
            Sign in to access your tickets
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <button type="button" onClick={handleGoogle} disabled={loading} style={{
          height: 52, borderRadius: 16, width: "100%",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)",
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
          transition: "border-color 150ms ease",
        }}>
          <GoogleIcon size={18} />
          {loading ? "Opening Google…" : "Continue with Google"}
        </button>

        <button type="button" onClick={() => { setView("phone"); setError(""); }} style={{
          height: 52, borderRadius: 16, width: "100%",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)",
          cursor: "pointer", fontFamily: "inherit",
          transition: "border-color 150ms ease",
        }}>
          <Phone size={16} strokeWidth={2} color="var(--color-text-primary)" />
          Continue with Mobile
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
        <span style={{ fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>or sign in with email</span>
        <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
      </div>

      <form onSubmit={handleEmailSignIn} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
            onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
          />
        </div>
        <div>
          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"} value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
              style={{ ...inputStyle, padding: "0 48px 0 16px" }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
              onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
            />
            <button type="button" onClick={() => setShowPw(p => !p)} style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center",
            }}>
              {showPw
                ? <EyeOff size={18} color="var(--color-text-muted)" strokeWidth={1.8} />
                : <Eye    size={18} color="var(--color-text-muted)" strokeWidth={1.8} />}
            </button>
          </div>
        </div>
        {error && <ErrorBox msg={error} />}
        <button type="submit" disabled={loading} style={{
          ...primaryBtn, marginTop: 4,
          background: loading ? "var(--color-accent-dim)" : "var(--color-accent)",
          boxShadow: loading ? "none" : "0 0 28px rgba(242,107,58,0.45)",
          cursor: loading ? "not-allowed" : "pointer",
        }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 28, marginBottom: 32, fontSize: 14, color: "var(--color-text-muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" style={{ color: "var(--color-accent)", fontWeight: 700 }}>Sign Up</Link>
      </p>
    </div>
  );
}
