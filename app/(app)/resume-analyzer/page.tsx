"use client";

import Link from "next/link";
import { useRef, useState, type DragEvent } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { MdOutlineAnalytics, MdOutlineInsertDriveFile, MdOutlineUploadFile } from "react-icons/md";
import { AiError } from "@/components/AiKeyNotice";
import { Button, Card, CardTitle, PageHeader, ProgressBar, Spinner, Tag, inputClass } from "@/components/ui";
import { useAppData } from "@/lib/app-data";
import { postForm } from "@/lib/client-api";
import type { ResumeAnalysis } from "@/lib/schemas";

const MAX_BYTES = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.docx,.txt";

function validate(file: File): string | null {
  const ext = file.name.toLowerCase().split(".").pop();
  if (!ext || !["pdf", "docx", "txt"].includes(ext)) return "Please choose a PDF, DOCX or TXT file.";
  if (file.size > MAX_BYTES) return "That file is over 4 MB. Please upload a smaller one.";
  if (file.size === 0) return "That file is empty.";
  return null;
}

export default function ResumeAnalyzerPage() {
  const { profile, resume, setResume, upsertHistory, setProfile } = useAppData();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const role = targetRole || profile.targetRole;
  const analysis: ResumeAnalysis | null = resume?.analysis ?? null;

  function choose(f: File | undefined | null) {
    if (!f) return;
    const problem = validate(f);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setFile(f);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    choose(e.dataTransfer.files?.[0]);
  }

  async function analyze() {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      if (role) form.append("targetRole", role);
      const { analysis } = await postForm<{ analysis: ResumeAnalysis }>("/api/resume", form);
      const createdAt = new Date().toISOString();
      setResume({ fileName: file.name, createdAt, analysis });
      upsertHistory({
        id: `resume-${Date.now()}`,
        type: "resume",
        title: `Resume analysis · ${file.name}`,
        summary: `Score ${analysis.overallScore}/100, ATS ${analysis.atsCompatibility}%. ${analysis.summary}`,
        createdAt,
      });
      // Seed the profile with detected skills the first time, so other pages personalise.
      if (profile.skills.length === 0) setProfile({ ...profile, skills: analysis.extractedSkills.slice(0, 40) });
      setFile(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setFile(null);
    setResume(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function downloadReport() {
    if (!analysis) return;
    const lines = [
      `Resume analysis${resume ? ` · ${resume.fileName}` : ""}`,
      `Date: ${resume ? new Date(resume.createdAt).toLocaleString() : ""}`,
      "",
      `Overall score: ${analysis.overallScore}/100`,
      `ATS compatibility: ${analysis.atsCompatibility}%`,
      "",
      analysis.summary,
      "",
      "STRENGTHS",
      ...analysis.strengths.map((s) => `- ${s}`),
      "",
      "AREAS FOR IMPROVEMENT",
      ...analysis.improvements.map((s) => `- ${s}`),
      "",
      "MISSING SKILLS",
      ...analysis.missingSkills.map((s) => `- ${s}`),
      "",
      "SUGGESTIONS",
      ...analysis.suggestions.map((s) => `- ${s}`),
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-analysis.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader
        icon={MdOutlineAnalytics}
        title="Resume Analyzer"
        subtitle="Get an honest score, ATS check and concrete improvements."
        actions={
          (analysis || file) && (
            <Button variant="ghost" className="border border-gray-700 bg-gray-800" onClick={reset}>
              <BiRefresh size={18} /> Reset
            </Button>
          )
        }
      />

      <Card className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{analysis ? "Analyze another resume" : "Upload your resume"}</h2>

        <div className="mb-4 max-w-sm">
          <label htmlFor="target-role" className="mb-1 block text-sm text-gray-400">
            Target role (optional, improves the feedback)
          </label>
          <input
            id="target-role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder={profile.targetRole || "e.g. Frontend Engineer"}
            className={inputClass}
            maxLength={100}
          />
        </div>

        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragging ? "border-indigo-500 bg-indigo-500/10" : "border-gray-600 hover:border-indigo-500"
            }`}
          >
            <MdOutlineUploadFile className="mx-auto mb-4 text-indigo-500" size={48} />
            <p className="mb-4 text-gray-400">Drag and drop your resume here, or click to browse</p>
            <input
              ref={inputRef}
              id="resume-upload"
              type="file"
              accept={ACCEPT}
              className="sr-only"
              onChange={(e) => choose(e.target.files?.[0])}
            />
            <label
              htmlFor="resume-upload"
              className="inline-block cursor-pointer rounded-full bg-indigo-500 px-6 py-2 font-semibold text-white transition hover:brightness-110"
            >
              Choose File
            </label>
            <p className="mt-2 text-sm text-gray-500">PDF, DOCX or TXT · max 4 MB</p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-700 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <MdOutlineInsertDriveFile className="shrink-0 text-indigo-500" size={24} />
              <span className="truncate">{file.name}</span>
              <span className="shrink-0 text-sm text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setFile(null)} disabled={busy}>
                Remove
              </Button>
              <Button onClick={analyze} disabled={busy}>
                {busy ? "Analyzing…" : "Analyze Resume"}
              </Button>
            </div>
          </div>
        )}

        <p className="mt-3 text-xs text-gray-500">
          Your file is sent to the AI service for analysis and isn&apos;t stored on our server.
        </p>
      </Card>

      {error && (
        <div className="mb-8">
          <AiError message={error} />
        </div>
      )}

      {busy && (
        <Card className="mb-8">
          <Spinner label="Reading your resume and scoring it. This takes ~10-20 seconds…" />
        </Card>
      )}

      {analysis && !busy && (
        <>
          <p className="mb-4 text-sm text-gray-400">
            Showing analysis of <span className="text-gray-200">{resume?.fileName}</span>
          </p>

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardTitle right={<MdOutlineAnalytics className="text-indigo-500" size={20} />}>Overall Score</CardTitle>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{analysis.overallScore}</span>
                <span className="text-lg text-indigo-500">/100</span>
              </div>
              <ProgressBar value={analysis.overallScore} />
              <p className="mt-4 text-sm text-gray-300">{analysis.summary}</p>
            </Card>
            <Card>
              <CardTitle right={<FaCheckCircle className="text-indigo-500" size={20} />}>ATS Compatibility</CardTitle>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{analysis.atsCompatibility}</span>
                <span className="text-lg text-indigo-500">%</span>
              </div>
              <ProgressBar value={analysis.atsCompatibility} />
              <p className="mt-4 text-sm text-gray-400">
                How reliably applicant-tracking systems can parse your headings, keywords and layout.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ListCard title="Strengths" icon={<FaCheckCircle className="text-indigo-500" />} items={analysis.strengths} />
            <ListCard
              title="Areas for Improvement"
              icon={<FaExclamationTriangle className="text-indigo-500" />}
              items={analysis.improvements}
            />
            <ListCard
              title="Missing Skills"
              icon={<FaTimesCircle className="text-indigo-500" />}
              items={analysis.missingSkills}
              empty="No notable gaps for this role."
            />
            <ListCard title="Suggestions" icon={<MdOutlineAnalytics className="text-indigo-500" />} items={analysis.suggestions} />
          </div>

          {analysis.suggestedRoles.length > 0 && (
            <Card className="mt-6">
              <CardTitle>Roles you fit</CardTitle>
              <div className="flex flex-wrap gap-2">
                {analysis.suggestedRoles.map((r) => (
                  <Tag key={r}>{r}</Tag>
                ))}
              </div>
            </Card>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="flex-1 py-3" onClick={downloadReport}>
              Download Analysis Report
            </Button>
            <Link
              href="/roadmap-generator"
              className="flex-1 rounded-full bg-gray-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-600"
            >
              Generate Career Roadmap
            </Link>
            <Link
              href="/job-recommendations"
              className="flex-1 rounded-full bg-gray-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-600"
            >
              See Role Matches
            </Link>
          </div>
        </>
      )}
    </>
  );
}

function ListCard({ title, icon, items, empty }: { title: string; icon: React.ReactNode; items: string[]; empty?: string }) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">{empty ?? "Nothing to show."}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
