"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BiDownload, BiTrash } from "react-icons/bi";
import { FaBriefcase, FaComments, FaFileAlt, FaRoad, FaUserTie } from "react-icons/fa";
import { MdOutlineHistory, MdSearch } from "react-icons/md";
import { Button, Card, EmptyState, PageHeader, cx, inputClass } from "@/components/ui";
import { useAppData } from "@/lib/app-data";
import type { HistoryType } from "@/lib/schemas";

const meta: Record<HistoryType, { label: string; icon: typeof FaFileAlt; href: string }> = {
  resume: { label: "Resume", icon: FaFileAlt, href: "/resume-analyzer" },
  roadmap: { label: "Roadmap", icon: FaRoad, href: "/roadmap-generator" },
  chat: { label: "Q&A", icon: FaComments, href: "/career-qa" },
  careers: { label: "Careers", icon: FaBriefcase, href: "/dashboard" },
  jobs: { label: "Roles", icon: FaUserTie, href: "/job-recommendations" },
};

export default function HistoryPage() {
  const { history, removeHistory, clearHistory } = useAppData();
  const [filter, setFilter] = useState<HistoryType | "all">("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return history.filter(
      (h) => (filter === "all" || h.type === filter) && (!q || h.title.toLowerCase().includes(q) || h.summary.toLowerCase().includes(q)),
    );
  }, [history, filter, query]);

  function exportHistory() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(history, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "career-coach-history.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader
        icon={MdOutlineHistory}
        title="My History"
        subtitle="Everything you've generated, stored on this device."
        actions={
          history.length > 0 && (
            <>
              <Button variant="outline" onClick={exportHistory}>
                <BiDownload /> Export
              </Button>
              <Button
                variant="ghost"
                className="border border-gray-700"
                onClick={() => window.confirm("Clear all history? This can't be undone.") && clearHistory()}
              >
                <BiTrash /> Clear all
              </Button>
            </>
          )
        }
      />

      {history.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          action={
            <Link href="/resume-analyzer" className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold hover:brightness-110">
              Analyze your resume
            </Link>
          }
        >
          Your resume analyses, roadmaps, role matches and chats will show up here.
        </EmptyState>
      ) : (
        <>
          <Card className="mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search history"
                  aria-label="Search history"
                  className={cx(inputClass, "pl-9")}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", ...Object.keys(meta)] as Array<HistoryType | "all">).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={cx(
                      "rounded-full px-4 py-1.5 text-sm transition",
                      filter === f ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600",
                    )}
                  >
                    {f === "all" ? "All" : meta[f].label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {items.length === 0 ? (
            <EmptyState title="No matches">Try a different filter or search term.</EmptyState>
          ) : (
            <ul className="space-y-3">
              {items.map((h) => {
                const { icon: Icon, label, href } = meta[h.type];
                const d = new Date(h.createdAt);
                return (
                  <li key={h.id}>
                    <Card className="flex items-start gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
                        <Icon />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-semibold">{h.title}</h3>
                          <span className="rounded-full border border-indigo-500/50 px-2 py-0.5 text-xs text-indigo-500">{label}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-400">{h.summary}</p>
                        <p className="mt-2 text-xs text-gray-500">
                          {d.toLocaleDateString()} · {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Link href={href} className="rounded-full px-3 py-1.5 text-sm text-indigo-500 hover:bg-indigo-500 hover:text-white">
                          Open
                        </Link>
                        <button
                          onClick={() => removeHistory(h.id)}
                          aria-label={`Delete ${h.title}`}
                          className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}
