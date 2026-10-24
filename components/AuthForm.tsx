"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/lib/auth";
import { Button, ErrorNote, inputClass } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { user, loading, login, register, loginAsGuest } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (isRegister) {
      if (password.length < 8) return setError("Password must be at least 8 characters.");
      if (password !== String(form.get("confirm") ?? "")) return setError("Passwords do not match.");
    }

    setBusy(true);
    try {
      if (isRegister) await register(name, email, password);
      else await login(email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">{isRegister ? "Create an Account" : "Log In"}</h1>

        <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
          {isRegister && (
            <Field label="Full name" id="name">
              <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
            </Field>
          )}
          <Field label="Email" id="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Password" id="password">
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={isRegister ? 8 : undefined}
              autoComplete={isRegister ? "new-password" : "current-password"}
              placeholder={isRegister ? "At least 8 characters" : "Your password"}
              className={inputClass}
            />
          </Field>
          {isRegister && (
            <Field label="Confirm password" id="confirm">
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Repeat password"
                className={inputClass}
              />
            </Field>
          )}

          {error && <ErrorNote>{error}</ErrorNote>}

          <Button type="submit" disabled={busy} className="w-full rounded-md">
            {busy ? "Please wait…" : isRegister ? "Sign Up" : "Log In"}
          </Button>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-600" />
          <span className="mx-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        <Button
          variant="secondary"
          className="w-full border border-gray-600"
          onClick={() => {
            loginAsGuest();
            router.replace("/dashboard");
          }}
        >
          <FaUser /> Continue as Guest
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <Link href={isRegister ? "/login" : "/register"} className="ml-1 font-medium text-indigo-500 hover:underline">
            {isRegister ? "Log In" : "Sign Up"}
          </Link>
        </p>
        <p className="mt-4 text-center text-xs text-gray-500">
          Demo accounts are stored only in this browser.
        </p>
      </div>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}
