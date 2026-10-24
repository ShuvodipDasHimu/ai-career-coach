"use client";

import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { BiDownload, BiSave, BiTrash } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { MdOutlinePerson, MdOutlineSettings, MdOutlineStorage } from "react-icons/md";
import { Button, Card, CardTitle, PageHeader, cx, inputClass } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useAppData } from "@/lib/app-data";
import { experienceLevels, type Profile } from "@/lib/schemas";

type Tab = "profile" | "data";

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, setProfile, ready, history, resume, roadmaps, clearAllData } = useAppData();
  const [tab, setTab] = useState<Tab>("profile");
  const [draft, setDraft] = useState<Profile>(profile);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved] = useState(false);

  // Sync the form once stored data has loaded.
  useEffect(() => {
    if (ready) setDraft(profile);
  }, [ready, profile]);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setSaved(false);
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function addSkill() {
    const parts = skillInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const existing = new Set(draft.skills.map((s) => s.toLowerCase()));
    const next = [...draft.skills];
    for (const p of parts) if (!existing.has(p.toLowerCase()) && next.length < 40) next.push(p.slice(0, 60));
    update("skills", next);
    setSkillInput("");
  }

  function onSkillKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  }

  function save(e: FormEvent) {
    e.preventDefault();
    setProfile({ ...draft, skills: draft.skills });
    setSaved(true);
  }

  function exportAll() {
    const data = { exportedAt: new Date().toISOString(), profile, resume, roadmaps, history };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "career-coach-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const tabs: Array<{ id: Tab; name: string; icon: typeof MdOutlinePerson }> = [
    { id: "profile", name: "Profile", icon: MdOutlinePerson },
    { id: "data", name: "Privacy & Data", icon: MdOutlineStorage },
  ];

  return (
    <>
      <PageHeader
        icon={MdOutlineSettings}
        title="Profile & Settings"
        subtitle="The more the coach knows, the better its advice."
      />

      <div className="mb-6 flex gap-2" role="tablist">
        {tabs.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cx(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
              tab === id ? "bg-indigo-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
            )}
          >
            <Icon /> {name}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <form onSubmit={save}>
          <Card className="space-y-5">
            <CardTitle>Your profile</CardTitle>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" id="name">
                <input id="name" className={inputClass} value={draft.name} maxLength={100} onChange={(e) => update("name", e.target.value)} />
              </Field>
              <Field label="Email" id="email">
                <input
                  id="email"
                  type="email"
                  className={cx(inputClass, "opacity-70")}
                  value={draft.email || user?.email || ""}
                  readOnly
                  placeholder={user?.guest ? "Guest session" : ""}
                />
              </Field>
              <Field label="Target role" id="role">
                <input
                  id="role"
                  className={inputClass}
                  placeholder="e.g. AI Engineer"
                  value={draft.targetRole}
                  maxLength={100}
                  onChange={(e) => update("targetRole", e.target.value)}
                />
              </Field>
              <Field label="Experience level" id="level">
                <select
                  id="level"
                  className={inputClass}
                  value={draft.experienceLevel}
                  onChange={(e) => update("experienceLevel", e.target.value as Profile["experienceLevel"])}
                >
                  {experienceLevels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </Field>
              <Field label="Location" id="loc">
                <input
                  id="loc"
                  className={inputClass}
                  placeholder="City, Country"
                  value={draft.location}
                  maxLength={100}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>
            </div>

            <Field label="About you" id="bio">
              <textarea
                id="bio"
                rows={3}
                maxLength={600}
                className={inputClass}
                placeholder="A sentence or two about your background and goals"
                value={draft.bio}
                onChange={(e) => update("bio", e.target.value)}
              />
            </Field>

            <div>
              <label htmlFor="skills" className="mb-1 block text-sm font-medium text-gray-300">
                Skills <span className="text-gray-500">(press Enter or comma to add)</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="skills"
                  className={inputClass}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={onSkillKey}
                  placeholder="React, Python, SQL…"
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>
              {draft.skills.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {draft.skills.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-1 rounded-full border border-indigo-500/50 bg-indigo-500/10 py-1 pl-3 pr-2 text-xs text-indigo-500"
                    >
                      {s}
                      <button
                        type="button"
                        aria-label={`Remove ${s}`}
                        onClick={() => update("skills", draft.skills.filter((x) => x !== s))}
                        className="rounded-full p-1 hover:bg-indigo-500 hover:text-white"
                      >
                        <FaTimes size={10} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit">
                <BiSave size={18} /> Save profile
              </Button>
              {saved && (
                <span role="status" className="text-sm text-indigo-500">
                  Saved
                </span>
              )}
            </div>
          </Card>
        </form>
      )}

      {tab === "data" && (
        <div className="space-y-6">
          <Card>
            <CardTitle>Where your data lives</CardTitle>
            <p className="text-sm text-gray-400">
              Your profile, history, roadmaps and chats are stored in this browser only. Resumes and chat messages are sent to the AI
              provider to generate responses; resume files are not saved on our server.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Stored right now: {history.length} history item{history.length === 1 ? "" : "s"}, {roadmaps.length} roadmap
              {roadmaps.length === 1 ? "" : "s"}, {resume ? "1 resume analysis" : "no resume analysis"}.
            </p>
            <div className="mt-4">
              <Button variant="outline" onClick={exportAll}>
                <BiDownload /> Export my data (JSON)
              </Button>
            </div>
          </Card>

          <Card>
            <CardTitle>Danger zone</CardTitle>
            <p className="mb-4 text-sm text-gray-400">Remove everything this app has saved for you in this browser.</p>
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm("Delete all saved data (profile, history, roadmaps, chats)? This can't be undone.")) {
                  clearAllData();
                }
              }}
            >
              <BiTrash /> Delete all my data
            </Button>
          </Card>
        </div>
      )}
    </>
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
