"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BiBookmark, BiBookmarkHeart, BiRefresh } from "react-icons/bi";
import { FaExternalLinkAlt, FaUserTie } from "react-icons/fa";
import { MdOutlineLocationOn, MdSearch } from "react-icons/md";
import { AiError } from "@/components/AiKeyNotice";
import { Button, Card, EmptyState, PageHeader, ProgressBar, Spinner, Tag, cx, inputClass } from "@/components/ui";
import { useAppData } from "@/lib/app-data";
import { postJson } from "@/lib/client-api";
import type { JobMatch } from "@/lib/schemas";

const jobKey = (j: JobMatch) => `${j.title}|${j.companyType}`;

export default function JobRecommendationsPage() {
  const { profile, resume, allSkills, jobs, setJobs, savedJobs, toggleSavedJob, upsertHistory } = useAppData();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [employment, setEmployment] = useState("all");
  const [seniority, setSeniority] = useState("all");
  const [workMode, setWorkMode] = useState("all");
  const [onlySaved, setOnlySaved] = useState(false);

  const canGenerate = allSkills.length > 0 || !!profile.targetRole;

  async function generate() {
    setBusy(true);
    setError("");
    try {
      const res = await postJson<{ jobs: JobMatch[] }>("/api/jobs", {
        profile,
        resumeSkills: resume?.analysis.extractedSkills ?? [],
      });
      const sorted = [...res.jobs].sort((a, b) => b.matchScore - a.matchScore);
      setJobs({ createdAt: new Date().toISOString(), data: sorted });
      upsertHistory({
        id: `jobs-${Date.now()}`,
        type: "jobs",
        title: "Role matches",
        summary: `${sorted.length} roles · best match: ${sorted[0]?.title ?? "n/a"} (${sorted[0]?.matchScore ?? 0}%)`,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load role matches.");
    } finally {
      setBusy(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (jobs?.data ?? []).filter(
      (j) =>
        (employment === "all" || j.employment === employment) &&
        (seniority === "all" || j.seniority === seniority) &&
        (workMode === "all" || j.workMode === workMode) &&
        (!onlySaved || savedJobs.includes(jobKey(j))) &&
        (!q ||
          j.title.toLowerCase().includes(q) ||
          j.companyType.toLowerCase().includes(q) ||
          j.requirements.some((r) => r.toLowerCase().includes(q))),
    );
  }, [jobs, query, employment, seniority, workMode, onlySaved, savedJobs]);

  const searchUrl = (j: JobMatch) =>
    `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(j.searchQuery || j.title)}${
      profile.location ? `&location=${encodeURIComponent(profile.location)}` : ""
    }`;

  const mine = new Set(allSkills.map((s) => s.toLowerCase()));

  return (
    <>
      <PageHeader
        icon={FaUserTie}
        title="Job Recommendations"
        subtitle="AI-suggested roles that fit your skills, not live listings. Use the search links to find real openings."
        actions={
          jobs && (
            <Button variant="outline" onClick={generate} disabled={busy}>
              <BiRefresh className={busy ? "animate-spin" : ""} /> Refresh
            </Button>
          )
        }
      />

      {error && (
        <div className="mb-6">
          <AiError message={error} />
        </div>
      )}

      {busy && (
        <Card>
          <Spinner label="Matching roles to your skills…" />
        </Card>
      )}

      {!busy && !jobs && (
        <EmptyState
          title="Find roles that fit you"
          action={
            canGenerate ? (
              <Button onClick={generate}>Find matching roles</Button>
            ) : (
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/resume-analyzer" className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold hover:brightness-110">
                  Analyze a resume
                </Link>
                <Link href="/settings" className="rounded-full border border-indigo-500 px-5 py-2 text-sm font-semibold text-indigo-500 hover:bg-indigo-500 hover:text-white">
                  Edit profile
                </Link>
              </div>
            )
          }
        >
          {canGenerate
            ? "We'll use your profile and resume skills to suggest roles and show how well you match."
            : "Add your skills and target role in your profile, or analyze a resume, so we can match roles accurately."}
        </EmptyState>
      )}

      {!busy && jobs && (
        <>
          <Card className="mb-6">
            <div className="grid gap-3 md:grid-cols-5">
              <div className="relative md:col-span-2">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, employer type or skill"
                  aria-label="Search roles"
                  className={cx(inputClass, "pl-9")}
                />
              </div>
              <Select label="Employment" value={employment} onChange={setEmployment} options={["Full-time", "Part-time", "Contract", "Internship"]} />
              <Select label="Seniority" value={seniority} onChange={setSeniority} options={["Entry-level", "Mid-level", "Senior"]} />
              <Select label="Work mode" value={workMode} onChange={setWorkMode} options={["Remote", "Hybrid", "On-site"]} />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={onlySaved} onChange={(e) => setOnlySaved(e.target.checked)} />
              Saved only ({savedJobs.length})
            </label>
          </Card>

          {filtered.length === 0 ? (
            <EmptyState title="No roles match these filters">Try clearing a filter or the search box.</EmptyState>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filtered.map((j) => {
                const key = jobKey(j);
                const saved = savedJobs.includes(key);
                return (
                  <Card key={key} className="flex flex-col">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold">{j.title}</h3>
                        <p className="text-sm text-gray-400">{j.companyType}</p>
                      </div>
                      <button
                        onClick={() => toggleSavedJob(key)}
                        aria-label={saved ? "Remove from saved" : "Save role"}
                        aria-pressed={saved}
                        className="text-indigo-500 hover:brightness-125"
                      >
                        {saved ? <BiBookmarkHeart size={24} /> : <BiBookmark size={24} />}
                      </button>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <ProgressBar value={j.matchScore} className="flex-1" />
                      <span className="text-sm font-bold text-indigo-500">{j.matchScore}% match</span>
                    </div>

                    <p className="mb-3 text-sm text-gray-300">{j.description}</p>
                    <p className="mb-3 text-sm text-gray-400">
                      <span className="text-gray-200">Why: </span>
                      {j.whyMatch}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MdOutlineLocationOn /> {j.workMode}
                      </span>
                      <span>{j.employment}</span>
                      <span>{j.seniority}</span>
                      <span className="text-gray-200">{j.salaryRange}</span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {j.requirements.map((r) => (
                        <span
                          key={r}
                          className={cx(
                            "rounded-full border px-2.5 py-0.5 text-xs",
                            mine.has(r.toLowerCase()) ? "border-indigo-500 bg-indigo-500 text-white" : "border-gray-600 text-gray-400",
                          )}
                          title={mine.has(r.toLowerCase()) ? "You have this skill" : "Skill gap"}
                        >
                          {r}
                        </span>
                      ))}
                    </div>

                    <a
                      href={searchUrl(j)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
                    >
                      Search live openings <FaExternalLinkAlt size={12} />
                    </a>
                  </Card>
                );
              })}
            </div>
          )}
          <p className="mt-6 text-center text-xs text-gray-500">
            Filled skill chips are ones you already have. <Tag>Generated {new Date(jobs.createdAt).toLocaleString()}</Tag>
          </p>
        </>
      )}
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className={inputClass}>
      <option value="all">All {label.toLowerCase()}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
