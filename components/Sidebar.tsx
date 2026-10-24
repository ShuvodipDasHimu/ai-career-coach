"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaUserTie } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";
import {
  MdOutlineAnalytics,
  MdOutlineAssessment,
  MdOutlineDashboard,
  MdOutlineHistory,
  MdOutlineLogout,
  MdOutlineSchool,
  MdOutlineSettings,
} from "react-icons/md";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui";

const nav = [
  { name: "Dashboard", icon: MdOutlineDashboard, href: "/dashboard" },
  { name: "Job Recommendations", icon: FaUserTie, href: "/job-recommendations" },
  { name: "Resume Analyzer", icon: MdOutlineAnalytics, href: "/resume-analyzer" },
  { name: "Roadmap Generator", icon: MdOutlineSchool, href: "/roadmap-generator" },
  { name: "Career Q&A", icon: MdOutlineAssessment, href: "/career-qa" },
  { name: "My History", icon: MdOutlineHistory, href: "/my-history" },
  { name: "Profile & Settings", icon: MdOutlineSettings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const links = (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {nav.map(({ name, icon: Icon, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg p-2.5 text-sm font-medium transition-colors ${
              active ? "bg-indigo-500 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {name}
          </Link>
        );
      })}
      <button
        onClick={() => setConfirming(true)}
        className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-sm font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
      >
        <MdOutlineLogout className="h-5 w-5 shrink-0" />
        Logout
      </button>
    </nav>
  );

  const brand = (
    <Link href="/dashboard" className="mb-6 flex items-center gap-2 px-1">
      <LuBrainCircuit size={30} className="text-indigo-500" />
      <span className="font-bold text-gray-100">AI Career Coach</span>
    </Link>
  );

  const userBadge = user && (
    <div className="mt-6 border-t border-gray-700 pt-4 text-xs text-gray-400">
      <p className="truncate font-medium text-gray-200">{user.name}</p>
      {user.email && <p className="truncate">{user.email}</p>}
      {user.guest && <p>Guest session</p>}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-700 bg-gray-800 p-4 lg:flex">
        {brand}
        {links}
        <div className="mt-auto">{userBadge}</div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LuBrainCircuit size={26} className="text-indigo-500" />
          <span className="font-bold">AI Career Coach</span>
        </Link>
        <button onClick={() => setMobileOpen(true)} aria-label="Open navigation" className="text-gray-300 hover:text-white">
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative h-full w-72 overflow-y-auto bg-gray-800 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 text-gray-300 hover:text-white"
              aria-label="Close navigation"
            >
              <FaTimes className="h-5 w-5" />
            </button>
            {brand}
            {links}
            {userBadge}
          </div>
        </div>
      )}

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-3">
              <MdOutlineLogout className="text-red-400" size={24} />
              <h3 className="text-xl font-semibold">Confirm logout</h3>
            </div>
            <p className="mb-6 text-gray-400">
              Your data stays saved in this browser. You&apos;ll need to sign in again to access it.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => {
                  logout();
                  router.replace("/");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
