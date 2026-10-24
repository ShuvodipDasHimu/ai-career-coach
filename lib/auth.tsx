"use client";

/**
 * DEMO AUTH — accounts live in this browser's localStorage only.
 * It gives each person their own workspace and protects the app routes, but it is NOT
 * secure authentication. For production, swap this provider for Auth.js / Clerk / Firebase Auth;
 * the rest of the app only depends on `useAuth()`.
 */

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

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
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
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomId() {
  return crypto.randomUUID();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore corrupt session */
    }
    setLoading(false);
  }, []);

  const startSession = useCallback((u: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const key = email.trim().toLowerCase();
      const accounts = readAccounts();
      if (accounts[key]) throw new Error("An account with this email already exists.");
      const salt = randomId();
      const account: Account = {
        id: randomId(),
        name: name.trim(),
        email: key,
        salt,
        hash: await sha256(salt + password),
      };
      accounts[key] = account;
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
      startSession({ id: account.id, name: account.name, email: account.email });
    },
    [startSession],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const account = readAccounts()[email.trim().toLowerCase()];
      if (!account || account.hash !== (await sha256(account.salt + password))) {
        throw new Error("Incorrect email or password.");
      }
      startSession({ id: account.id, name: account.name, email: account.email });
    },
    [startSession],
  );

  const loginAsGuest = useCallback(() => {
    startSession({ id: "guest", name: "Guest", email: "", guest: true });
  }, [startSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, register, login, loginAsGuest, logout }),
    [user, loading, register, login, loginAsGuest, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
