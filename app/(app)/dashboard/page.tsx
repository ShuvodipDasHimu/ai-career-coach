"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { LuBrainCircuit } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlinePendingActions } from "react-icons/md";
import { AiError } from "@/components/AiKeyNotice";
import { Button, Card, CardTitle, EmptyState, PageHeader, ProgressBar, Spinner } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useAppData } from "@/lib/app-data";
import { postJson } from "@/lib/client-api";
import type { CareerRecommendation } from "@/lib/schemas";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { ready, profile, resume, allSkills, careers, setCareers, activeRoadmap, history, upsertHistory } = useAppData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    if (!activeRoadmap) return null;
    const total = activeRoadmap.phases.reduce((n, p) => n + p.skills.length, 0);
    const done = Object.values(activeRoadmap.completed).filter(Boolean).length;
    return { total, done, remaining: total - done, pct: total ? (done / total) * 100 : 0 };
  }, [activeRoadmap]);

  const canRecommend = allSkills.length > 0 || !!profile.targetRole;
  const top = careers?.data[0];

  async function recommend() {
    setLoading(true);
    setError("");
    try {
      const res = await postJson<{ careers: CareerRecommendation[] }>("/api/careers", {
        profile,
        resumeSkills: resume?.analysis.extractedSkills ?? [],
      });
      setCareers({ createdAt: new Date().toISOString(), data: res.careers });
      upsertHistory({
        id: `careers-${Date.now()}`,
        type: "careers",
        title: "Career recommendations",
        summary: `Top match: ${res.careers[0]?.title ?? "n/a"} (${res.careers[0]?.fit ?? 0}% fit)`,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load recommendations.");
    } finally {
      setLoading(false);
    }
  }

  function startRoadmap(title: string) {
    router.push(`/roadmap-generator?career=${encodeURIComponent(title)}`);
  }

  const firstName = (profile.name || user?.name || "").split(" ")[0];

  return (
    <>
      <PageHeader
        icon={MdOutlineDashboard}
        title={firstName && firstName !== "Guest" ? `Welcome back, ${firstName}` : "Dashboard"}
        subtitle="Your career progress at a glance."
      />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardTitle
            right={
              <button
                onClick={recommend}
                disabled={loading || !canRecommend}
                aria-label="Refresh career recommendation"
                className="text-gray-400 hover:text-white disabled:opacity-40"
              >
                <BiRefresh size={20} className={loading ? "animate-spin" : ""} />
              </button>
            }
          >
            Current Career Path
          </CardTitle>
          {top ? (
            <>
              <span className="inline-block rounded-lg bg-gray-700 px-4 py-2 font-bold text-indigo-500">{top.title}</span>
              <p className="mt-2 text-sm text-gray-400">{top.fit}% fit based on your profile</p>
            </>
          ) : profile.targetRole ? (
            <>
              <span className="inline-block rounded-lg bg-gray-700 px-4 py-2 font-bold text-indigo-500">{profile.targetRole}</span>
              <p className="mt-2 text-sm text-gray-400">Your target role</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Set a target role in <Link href="/settings" className="text-indigo-500 hover:underline">Profile</Link> or analyze your resume.
            </p>
          )}
        </Card>

        <Card>
          <CardTitle right={<LuBrainCircuit className="text-indigo-500" size={20} />}>Skills Identified</CardTitle>
          <p className="mb-1 text-4xl font-bold">{ready ? allSkills.length : "–"}</p>
          <p className="text-sm text-gray-400">From your profile{resume ? " and latest resume" : ""}</p>
        </Card>

        <Card>
          <CardTitle right={<MdOutlinePendingActions className="text-indigo-500" size={22} />}>Roadmap Progress</CardTitle>
          {stats ? (
            <>
              <p className="mb-1 text-4xl font-bold">{stats.remaining}</p>
              <p className="mb-3 text-sm text-gray-400">
                skills remaining · {stats.done}/{stats.total} done
              </p>
              <ProgressBar value={stats.pct} />
            </>
          ) : (
            <p className="text-sm text-gray-400">
              No roadmap yet. <Link href="/roadmap-generator" className="text-indigo-500 hover:underline">Generate one</Link>.
            </p>
          )}
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Recommended Career Paths</h2>
        {careers && (
          <Button variant="outline" onClick={recommend} disabled={loading}>
            <BiRefresh className={loading ? "animate-spin" : ""} /> Refresh
          </Button>
        )}
      </div>

      {error && <div className="mb-4"><AiError message={error} /></div>}

      {loading ? (
        <Card><Spinner label="Analyzing your profile…" /></Card>
      ) : careers ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.data.map((c) => (
            <Card key={c.title} className="flex flex-col">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold">{c.title}</h3>
                <span className="shrink-0 font-bold text-indigo-500">
                  {c.fit}% <span className="text-sm font-normal text-gray-400">fit</span>
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-400">{c.reason}</p>
              <p className="mb-4 text-sm text-gray-400">
                Salary: <span className="text-gray-200">{c.salaryRange}</span>
                <br />
                Demand: <span className="font-semibold text-indigo-500">{c.demand}</span>
              </p>
              <Button className="mt-auto w-full" onClick={() => startRoadmap(c.title)}>
                Generate Roadmap
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Get personalised career suggestions"
          action={
            <Button onClick={recommend} disabled={!canRecommend}>
              Recommend careers for me
            </Button>
          }
        >
          {canRecommend
            ? "We'll use your profile and resume skills to suggest roles that fit."
            : "Add skills or a target role in your profile, or analyze a resume first."}
        </EmptyState>
      )}

      {history.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
          <Card className="divide-y divide-gray-700 p-0">
            {history.slice(0, 4).map((h) => (
              <div key={h.id} className="flex items-center justify-between gap-4 px-6 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{h.title}</p>
                  <p className="truncate text-gray-400">{h.summary}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-500">{new Date(h.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </Card>
        </div>
      )}
    </>
  );
}
