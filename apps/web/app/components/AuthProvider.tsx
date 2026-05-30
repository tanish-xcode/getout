"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export type User = { name: string; email: string; uid: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  loginWithGoogle:  () => Promise<{ ok: boolean; error?: string }>;
  login:            (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup:           (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null, loading: true,
  loginWithGoogle: async () => ({ ok: false }),
  login:           async () => ({ ok: false }),
  signup:          async () => ({ ok: false }),
  logout: async () => {},
});

function toUser(u: FirebaseUser): User {
  return {
    uid:   u.uid,
    name:  u.displayName ?? u.email?.split("@")[0] ?? "User",
    email: u.email ?? "",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? toUser(u) : null);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(toUser(result.user));
      return { ok: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed.";
      return { ok: false, error: msg };
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(toUser(result.user));
      return { ok: true };
    } catch (e: unknown) {
      const code = (e as { code?: string }).code;
      const msg =
        code === "auth/user-not-found"  ? "No account found with this email." :
        code === "auth/wrong-password"  ? "Incorrect password." :
        code === "auth/invalid-credential" ? "Incorrect email or password." :
        "Sign-in failed. Please try again.";
      return { ok: false, error: msg };
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name.trim() });
      setUser({ ...toUser(result.user), name: name.trim() });
      return { ok: true };
    } catch (e: unknown) {
      const code = (e as { code?: string }).code;
      const msg =
        code === "auth/email-already-in-use" ? "An account with this email already exists." :
        code === "auth/weak-password"         ? "Password must be at least 6 characters." :
        "Sign-up failed. Please try again.";
      return { ok: false, error: msg };
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
