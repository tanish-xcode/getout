"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "../components/AuthProvider";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const res = await signup(name, email, password);
    setLoading(false);
    if (res.ok) {
      router.push("/tickets");
    } else {
      setError(res.error ?? "Something went wrong.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 50,
    background: "var(--color-bg-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: 14,
    padding: "0 16px",
    fontSize: 15, color: "var(--color-text-primary)",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 150ms ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700,
    color: "var(--color-text-secondary)",
    textTransform: "uppercase", letterSpacing: "0.06em",
    display: "block", marginBottom: 6,
  };

  return (
    <div style={{
      minHeight: "100svh", display: "flex", flexDirection: "column",
      background: "var(--color-bg-base)",
      padding: "0 24px",
    }}>
      {/* Back */}
      <div style={{ paddingTop: 56, paddingBottom: 32 }}>
        <Link href="/" style={{
          width: 40, height: 40, borderRadius: 9999,
          background: "var(--color-bg-surface)", border: "1px solid var(--color-border)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowLeft size={18} color="var(--color-text-primary)" strokeWidth={2} />
        </Link>
      </div>

      {/* Logo mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13,
          background: "var(--color-accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 24px rgba(242,107,58,0.45)",
        }}>
          <Sparkles size={22} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <p style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>Create account</p>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 2 }}>Your tickets, all in one place</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Name */}
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Tanish Reddy"
            autoComplete="name"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
            onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
            onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
          />
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              style={{ ...inputStyle, padding: "0 48px 0 16px" }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--color-border-active)"}
              onBlur={e  => e.currentTarget.style.borderColor = "var(--color-border)"}
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                display: "flex", alignItems: "center",
              }}
            >
              {showPw
                ? <EyeOff size={18} color="var(--color-text-muted)" strokeWidth={1.8} />
                : <Eye    size={18} color="var(--color-text-muted)" strokeWidth={1.8} />
              }
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.30)",
            borderRadius: 12, padding: "10px 14px",
            fontSize: 13, color: "#F87171", fontWeight: 500,
          }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            height: 52, borderRadius: 16,
            background: loading ? "var(--color-accent-dim)" : "var(--color-accent)",
            border: "none", cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16, fontWeight: 800, color: "#fff",
            fontFamily: "inherit",
            marginTop: 6,
            boxShadow: loading ? "none" : "0 0 28px rgba(242,107,58,0.45)",
            transition: "all 200ms ease",
            letterSpacing: "-0.01em",
          }}
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      {/* Terms note */}
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
        By signing up you agree to our Terms &amp; Privacy Policy.
      </p>

      {/* Switch */}
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "var(--color-text-muted)" }}>
        Already have an account?{" "}
        <Link href="/sign-in" style={{ color: "var(--color-accent)", fontWeight: 700 }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
