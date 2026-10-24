"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiDownload, BiRefresh, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { MdOutlineSchool, MdOutlineTimer } from "react-icons/md";
import { AiError } from "@/components/AiKeyNotice";
import { Button, Card, EmptyState, PageHeader, ProgressBar, Spinner, cx, inputClass } from "@/components/ui";
import { useAppData } from "@/lib/app-data";
import { postJson } from "@/lib/client-api";
import { experienceLevels, type ExperienceLevel, type Roadmap, type SavedRoadmap } from "@/lib/schemas";

const presets = [
  "AI Engineer",
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "UX Designer",
];
const hours = [
  { id: "5-10", label: "5–10 hours/week", note: "Part-time" },
  { id: "10-20", label: "10–20 hours/week", note: "Dedicated" },
  { id: "20+", label: "20+ hours/week", note: "Intensive" },
] as const;

export function RoadmapClient() {
  const params = useSearchParams();
  const { profile, roadmaps, activeRoadmap, saveRoadmap, toggleSkill, deleteRoadmap, upsertHistory, ready } = useAppData();

  const [career, setCareer] = useState(params.get("career") ?? "");
  const [level, setLevel] = useState<ExperienceLevel | "">("");
  const [hoursPerWeek, setHoursPerWeek] = useState<(typeof hours)[number]["id"] | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Pre-fill from profile once it has loaded.
  useEffect(() => {
    if (!ready) return;
    setCareer((c) => c || profile.targetRole);
    setLevel((l) => l || profile.experienceLevel);
  }, [ready, profile.targetRole, profile.experienceLevel]);

  const current: SavedRoadmap | null = useMemo(
    () => roadmaps.find((r) => r.id === viewId) ?? activeRoadmap,
    [roadmaps, viewId, activeRoadmap],
  );
  const formVisible = showForm || !current || params.get("career") !== null;
  const canGenerate = career.trim().length >= 2 && level && hoursPerWeek && !busy;

  async function generate() {
    if (!canGenerate || !level || !hoursPerWeek) return;
    setBusy(true);
    setError("");
    try {
      const { roadmap } = await postJson<{ roadmap: Roadmap }>("/api/roadmap", {
        career: career.trim(),
        level,
        hoursPerWeek,
        profile,
      });
      const saved = saveRoadmap(roadmap, { career: career.trim(), level, hoursPerWeek });
      setViewId(saved.id);
      setShowForm(false);
      upsertHistory({
        id: `roadmap-${saved.id}`,
        type: "roadmap",
        title: roadmap.title,
        summary: `${roadmap.phases.length} phases · ${roadmap.duration} · ${level} · ${hoursPerWeek} h/week`,
      });
      // Clear ?career= so a refresh doesn't re-open the form.
      window.history.replaceState(null, "", "/roadmap-generator");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't generate a roadmap.");
    } finally {
      setBusy(false);
    }
  }

  function exportRoadmap(r: SavedRoadmap) {
    const lines = [r.title, `Duration: ${r.duration}`, "", r.overview, ""];
    r.phases.forEach((p, pi) => {
      lines.push(`PHASE ${pi + 1}: ${p.title} (${p.duration})`, `Goal: ${p.goal}`);
      p.skills.forEach((s, si) =>
        lines.push(`  [${r.completed[`${pi}:${si}`] ? "x" : " "}] ${s.name} (~${s.hours}h)${s.resource ? ` — ${s.resource}` : ""}`),
      );
      lines.push("");
    });
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.career.replace(/\W+/g, "-").toLowerCase()}-roadmap.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader
        icon={MdOutlineSchool}
        title="Roadmap Generator"
        subtitle="A phased plan built around your goal, level and available time."
        actions={
          current && !formVisible && (
            <Button variant="outline" onClick={() => setShowForm(true)}>
              <BiRefresh size={18} /> New roadmap
            </Button>
          )
        }
      />

      {formVisible && (
        <Card className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Create your roadmap</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="career" className="mb-2 block text-sm font-medium text-gray-300">
                1. Career goal
              </label>
              <input
                id="career"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                maxLength={100}
                placeholder="Type any role, or pick one below"
                className={cx(inputClass, "max-w-md")}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCareer(p)}
                    className={cx(
                      "rounded-full border px-3 py-1 text-xs transition",
                      career === p
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-600 text-gray-300 hover:border-indigo-500",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <Choice
              label="2. Current level"
              options={experienceLevels.map((l) => ({ id: l, label: l }))}
              value={level}
              onChange={(v) => setLevel(v as ExperienceLevel)}
            />
            <Choice
              label="3. Time you can commit"
              options={hours.map((h) => ({ id: h.id, label: h.label, note: h.note }))}
              value={hoursPerWeek}
              onChange={(v) => setHoursPerWeek(v as (typeof hours)[number]["id"])}
            />

            {error && <AiError message={error} />}

            <div className="flex gap-3">
              <Button onClick={generate} disabled={!canGenerate}>
                {busy ? "Generating…" : "Generate Roadmap"}
              </Button>
              {current && (
                <Button variant="ghost" onClick={() => setShowForm(false)} disabled={busy}>
                  Cancel
                </Button>
              )}
            </div>
            {busy && <Spinner label="Designing your plan. This takes ~15-30 seconds…" />}
          </div>
        </Card>
      )}

      {!current && !formVisible && <EmptyState title="No roadmap yet" />}

      {current && !busy && (
        <>
          <Card className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-2xl font-bold">{current.title}</h2>
                <p className="mt-1 text-sm text-gray-400">{current.overview}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-indigo-500">
                  <MdOutlineTimer /> {current.duration} · {current.level} · {current.hoursPerWeek} h/week
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => exportRoadmap(current)}>
                  <BiDownload /> Export
                </Button>
                <Button
                  variant="ghost"
                  aria-label="Delete roadmap"
                  onClick={() => {
                    if (window.confirm("Delete this roadmap?")) {
                      deleteRoadmap(current.id);
                      setViewId(null);
                    }
                  }}
                >
                  <BiTrash />
                </Button>
              </div>
            </div>
            <Progress roadmap={current} />
          </Card>

          <div className="space-y-6">
            {current.phases.map((phase, pi) => {
              const done = phase.skills.filter((_, si) => current.completed[`${pi}:${si}`]).length;
              return (
                <Card key={pi}>
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      <span className="mr-2 text-indigo-500">Phase {pi + 1}</span>
                      {phase.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {phase.duration} · {done}/{phase.skills.length} done
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-400">{phase.goal}</p>
                  <ul className="space-y-2">
                    {phase.skills.map((skill, si) => {
                      const key = `${pi}:${si}`;
                      const checked = !!current.completed[key];
                      return (
                        <li key={key}>
                          <button
                            onClick={() => toggleSkill(current.id, key)}
                            aria-pressed={checked}
                            className={cx(
                              "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition",
                              checked ? "border-indigo-500 bg-indigo-500/10" : "border-gray-700 hover:border-gray-500",
                            )}
                          >
                            {checked ? (
                              <FaCheckCircle className="mt-0.5 shrink-0 text-indigo-500" />
                            ) : (
                              <FaRegCircle className="mt-0.5 shrink-0 text-gray-500" />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className={cx("block text-sm font-medium", checked && "text-gray-400 line-through")}>
                                {skill.name}
                              </span>
                              {skill.resource && <span className="block text-xs text-gray-500">{skill.resource}</span>}
                            </span>
                            <span className="shrink-0 text-xs text-gray-400">~{skill.hours}h</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}
          </div>

          {roadmaps.length > 1 && (
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold">Your other roadmaps</h3>
              <div className="flex flex-wrap gap-2">
                {roadmaps
                  .filter((r) => r.id !== current.id)
                  .map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setViewId(r.id)}
                      className="rounded-full border border-gray-600 px-4 py-1.5 text-sm text-gray-300 transition hover:border-indigo-500"
                    >
                      {r.career} · {new Date(r.createdAt).toLocaleDateString()}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

function Progress({ roadmap }: { roadmap: SavedRoadmap }) {
  const total = roadmap.phases.reduce((n, p) => n + p.skills.length, 0);
  const done = Object.values(roadmap.completed).filter(Boolean).length;
  const pct = total ? (done / total) * 100 : 0;
  return (
    <div className="mt-5">
      <div className="mb-1 flex justify-between text-xs text-gray-400">
        <span>
          {done} of {total} skills completed
        </span>
        <span>{Math.round(pct)}%</span>
      </div>
      <ProgressBar value={pct} />
    </div>
  );
}

function Choice({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string; note?: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gray-300">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={cx(
              "rounded-lg border p-3 text-left text-sm transition",
              value === o.id ? "border-indigo-500 bg-indigo-500/10" : "border-gray-600 hover:border-indigo-500",
            )}
          >
            <span className="block font-medium">{o.label}</span>
            {o.note && <span className="block text-xs text-gray-400">{o.note}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
