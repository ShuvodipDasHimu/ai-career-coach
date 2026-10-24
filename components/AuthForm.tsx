"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { FaGoogle, FaUser } from "react-icons/fa";
import { useAuth, type OAuthProvider } from "@/lib/auth";
import { Button, ErrorNote, inputClass } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { user, loading, login, register, loginAsGuest, loginWithProvider } = useAuth();
  const urlError = useSearchParams().get("error");
  const [error, setError] = useState("");
  const [oauthBusy, setOauthBusy] = useState<OAuthProvider | null>(null);
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

  async function onProvider(provider: OAuthProvider) {
    setError("");
    setOauthBusy(provider);
    try {
      await loginWithProvider(provider); // redirects to the provider
    } catch {
      setError("Could not start sign-in. Please try again.");
      setOauthBusy(null);
    }
  }

  const verb = isRegister ? "Sign up" : "Sign in";
  const providerError = urlError ? oauthErrorMessage(urlError) : "";

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold">{isRegister ? "Create an Account" : "Log In"}</h1>

        {providerError && !error && (
          <div className="mb-4">
            <ErrorNote>{providerError}</ErrorNote>
          </div>
        )}

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
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        <div className="mb-3 space-y-3">
          <Button
            type="button"
            variant="secondary"
            disabled={oauthBusy !== null}
            onClick={() => onProvider("google")}
            className="w-full rounded-md border border-gray-600"
          >
            <FaGoogle /> {oauthBusy === "google" ? "Redirecting…" : `${verb} with Google`}
          </Button>
          {/* LinkedIn disabled — re-enable here and in auth.ts
          <Button
            type="button"
            variant="secondary"
            disabled={oauthBusy !== null}
            onClick={() => onProvider("linkedin")}
            className="w-full rounded-md border border-gray-600"
          >
            <FaLinkedinIn /> {oauthBusy === "linkedin" ? "Redirecting…" : `${verb} with LinkedIn`}
          </Button>
          */}
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

function oauthErrorMessage(code: string): string {
  switch (code) {
    case "OAuthAccountNotLinked":
      return "This email is already linked to a different sign-in method. Use the one you used originally.";
    case "AccessDenied":
      return "Access was denied. Please try again.";
    case "Configuration":
      return "Social sign-in isn't configured on the server yet (missing environment variables).";
    default:
      return "Sign-in failed. Please try again.";
  }
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
