"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "./auth";
import {
  emptyProfile,
  type CareerRecommendation,
  type HistoryItem,
  type JobMatch,
  type Profile,
  type ResumeAnalysis,
  type Roadmap,
  type SavedRoadmap,
  type ExperienceLevel,
} from "./schemas";

export interface StoredResume {
  fileName: string;
  createdAt: string;
  analysis: ResumeAnalysis;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
}

interface Cached<T> {
  createdAt: string;
  data: T;
}

interface AppData {
  ready: boolean;
  profile: Profile;
  setProfile: (p: Profile) => void;

  history: HistoryItem[];
  upsertHistory: (item: Omit<HistoryItem, "createdAt"> & { createdAt?: string }) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;

  resume: StoredResume | null;
  setResume: (r: StoredResume | null) => void;

  roadmaps: SavedRoadmap[];
  activeRoadmap: SavedRoadmap | null;
  saveRoadmap: (r: Roadmap, meta: { career: string; level: ExperienceLevel; hoursPerWeek: string }) => SavedRoadmap;
  toggleSkill: (roadmapId: string, key: string) => void;
  deleteRoadmap: (id: string) => void;

  chat: ChatSession;
  setChat: (updater: ChatSession | ((prev: ChatSession) => ChatSession)) => void;
  newChat: () => void;

  careers: Cached<CareerRecommendation[]> | null;
  setCareers: (c: Cached<CareerRecommendation[]> | null) => void;
  jobs: Cached<JobMatch[]> | null;
  setJobs: (j: Cached<JobMatch[]> | null) => void;
  savedJobs: string[];
  toggleSavedJob: (key: string) => void;

  /** Skills from the profile plus the latest resume, de-duplicated (case-insensitive). */
  allSkills: string[];
  clearAllData: () => void;
}

const AppDataContext = createContext<AppData | null>(null);

const newSession = (): ChatSession => ({ id: crypto.randomUUID(), messages: [] });

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const p = user ? `cc:${user.id}:` : null;
  const k = (name: string) => (p ? p + name : null);

  const [profile, setProfile, ready] = useLocalStorage<Profile>(k("profile"), {
    ...emptyProfile,
    name: user?.name && !user.guest ? user.name : "",
    email: user?.email ?? "",
  });
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(k("history"), []);
  const [resume, setResume] = useLocalStorage<StoredResume | null>(k("resume"), null);
  const [roadmaps, setRoadmaps] = useLocalStorage<SavedRoadmap[]>(k("roadmaps"), []);
  const [chat, setChat] = useLocalStorage<ChatSession>(k("chat"), { id: "initial", messages: [] });
  const [careers, setCareers] = useLocalStorage<Cached<CareerRecommendation[]> | null>(k("careers"), null);
  const [jobs, setJobs] = useLocalStorage<Cached<JobMatch[]> | null>(k("jobs"), null);
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>(k("savedJobs"), []);

  // Pre-fill a fresh profile with the account's name/email once storage has loaded.
  useEffect(() => {
    if (ready && user && !user.guest && !profile.name && !profile.email) {
      setProfile({ ...profile, name: user.name, email: user.email });
    }
  }, [ready, user, profile, setProfile]);

  const upsertHistory = useCallback<AppData["upsertHistory"]>(
    (item) => {
      setHistory((prev) => {
        const entry: HistoryItem = { ...item, createdAt: item.createdAt ?? new Date().toISOString() };
        const idx = prev.findIndex((h) => h.id === item.id);
        if (idx === -1) return [entry, ...prev].slice(0, 200);
        const next = [...prev];
        next[idx] = { ...next[idx], ...entry, createdAt: next[idx].createdAt };
        return next;
      });
    },
    [setHistory],
  );

  const removeHistory = useCallback((id: string) => setHistory((prev) => prev.filter((h) => h.id !== id)), [setHistory]);
  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  const saveRoadmap = useCallback<AppData["saveRoadmap"]>(
    (r, meta) => {
      const saved: SavedRoadmap = {
        ...r,
        ...meta,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        completed: {},
      };
      setRoadmaps((prev) => [saved, ...prev].slice(0, 20));
      return saved;
    },
    [setRoadmaps],
  );

  const toggleSkill = useCallback(
    (roadmapId: string, key: string) =>
      setRoadmaps((prev) =>
        prev.map((r) =>
          r.id === roadmapId ? { ...r, completed: { ...r.completed, [key]: !r.completed[key] } } : r,
        ),
      ),
    [setRoadmaps],
  );

  const deleteRoadmap = useCallback((id: string) => setRoadmaps((prev) => prev.filter((r) => r.id !== id)), [setRoadmaps]);

  const newChat = useCallback(() => setChat(newSession()), [setChat]);

  const toggleSavedJob = useCallback(
    (key: string) => setSavedJobs((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key])),
    [setSavedJobs],
  );

  const allSkills = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of [...profile.skills, ...(resume?.analysis.extractedSkills ?? [])]) {
      const t = s.trim();
      if (t && !seen.has(t.toLowerCase())) seen.set(t.toLowerCase(), t);
    }
    return [...seen.values()];
  }, [profile.skills, resume]);

  const clearAllData = useCallback(() => {
    if (!p) return;
    Object.keys(localStorage)
      .filter((key) => key.startsWith(p))
      .forEach((key) => localStorage.removeItem(key));
    setProfile({ ...emptyProfile, name: profile.name, email: profile.email });
    setHistory([]);
    setResume(null);
    setRoadmaps([]);
    setChat(newSession());
    setCareers(null);
    setJobs(null);
    setSavedJobs([]);
  }, [p, profile.name, profile.email, setProfile, setHistory, setResume, setRoadmaps, setChat, setCareers, setJobs, setSavedJobs]);

  const value: AppData = {
    ready,
    profile,
    setProfile,
    history,
    upsertHistory,
    removeHistory,
    clearHistory,
    resume,
    setResume,
    roadmaps,
    activeRoadmap: roadmaps[0] ?? null,
    saveRoadmap,
    toggleSkill,
    deleteRoadmap,
    chat,
    setChat,
    newChat,
    careers,
    setCareers,
    jobs,
    setJobs,
    savedJobs,
    toggleSavedJob,
    allSkills,
    clearAllData,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used inside <AppDataProvider>");
  return ctx;
}
