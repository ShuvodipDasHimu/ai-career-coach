"use client";

/**
 * Email/password + guest accounts are DEMO-grade (browser localStorage only).
 * Google/LinkedIn sign-in is real OAuth through Auth.js and takes precedence when present.
 */

import { signIn, signOut, useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  guest?: boolean;
}

interface Account extends User {
  salt: string;
  hash: string;
}

export type OAuthProvider = "google" | "linkedin";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: OAuthProvider) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const SESSION_KEY = "cc:session";
const ACCOUNTS_KEY = "cc:accounts";

const AuthContext = createContext<AuthContextValue | null>(null);

function readAccounts(): Record<string, Account> {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "{}") as Record<string, Account>;
  } catch {
    return {};
  }
}

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [local, setLocal] = useState<User | null>(null);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setLocal(JSON.parse(raw) as User);
    } catch {
      /* ignore corrupt session */
    }
    setLocalLoading(false);
  }, []);

  const oauthUser: User | null = session?.user?.email
    ? {
        id: `oauth-${session.user.email.toLowerCase()}`,
        name: session.user.name ?? session.user.email,
        email: session.user.email,
      }
    : null;

  const user = oauthUser ?? local;
  const loading = status === "loading" || localLoading;

  const startLocalSession = useCallback((u: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setLocal(u);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const key = email.trim().toLowerCase();
      const accounts = readAccounts();
      if (accounts[key]) throw new Error("An account with this email already exists.");
      const salt = crypto.randomUUID();
      const account: Account = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: key,
        salt,
        hash: await sha256(salt + password),
      };
      accounts[key] = account;
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      startLocalSession({ id: account.id, name: account.name, email: account.email });
    },
    [startLocalSession],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const account = readAccounts()[email.trim().toLowerCase()];
      if (!account || account.hash !== (await sha256(account.salt + password))) {
        throw new Error("Incorrect email or password.");
      }
      startLocalSession({ id: account.id, name: account.name, email: account.email });
    },
    [startLocalSession],
  );

  const loginWithProvider = useCallback(async (provider: OAuthProvider) => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  }, []);

  const loginAsGuest = useCallback(() => {
    startLocalSession({ id: "guest", name: "Guest", email: "", guest: true });
  }, [startLocalSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setLocal(null);
    if (oauthUser) void signOut({ callbackUrl: "/" });
  }, [oauthUser]);

  const value = useMemo(
    () => ({ user, loading, register, login, loginWithProvider, loginAsGuest, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user?.id, loading, register, login, loginWithProvider, loginAsGuest, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}