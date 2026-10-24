"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import { useAuth } from "@/lib/auth";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  const links = user ? (
    <Link
      href="/dashboard"
      onClick={() => setOpen(false)}
      className="rounded-full bg-indigo-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:brightness-110"
    >
      Go to Dashboard
    </Link>
  ) : (
    <>
      <Link
        href="/register"
        onClick={() => setOpen(false)}
        className="rounded-full bg-indigo-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:brightness-110"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        onClick={() => setOpen(false)}
        className="rounded-full border border-indigo-500 px-4 py-2 text-center text-sm font-medium text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
      >
        Login
      </Link>
    </>
  );

  return (
    <div className="flex items-center justify-between px-4 py-6 md:px-8">
      <Link href="/" className="flex items-center gap-2">
        <LuBrainCircuit size={40} className="text-indigo-500" />
        <span className="text-xl font-bold text-gray-100 sm:text-2xl">AI Career Coach</span>
      </Link>

      <nav className={`hidden items-center gap-3 md:flex ${loading ? "invisible" : ""}`}>{links}</nav>

      <button
        className="text-gray-300 hover:text-white md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
      >
        <FaBars className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative ml-auto flex h-full w-72 flex-col gap-3 bg-gray-800 p-6 pt-16 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white hover:text-gray-300"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            {links}
          </div>
        </div>
      )}
    </div>
  );
}
