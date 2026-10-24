import { z } from "zod";

/* ---------- Shared enums ---------- */
export const experienceLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];

/* ---------- Profile (client-side, sent as context to AI routes) ---------- */
export const profileSchema = z.object({
  name: z.string().max(100).default(""),
  email: z.string().max(200).default(""),
  targetRole: z.string().max(100).default(""),
  experienceLevel: z.enum(experienceLevels).default("Beginner"),
  skills: z.array(z.string().max(60)).max(40).default([]),
  location: z.string().max(100).default(""),
  bio: z.string().max(600).default(""),
});
export type Profile = z.infer<typeof profileSchema>;

export const emptyProfile: Profile = {
  name: "",
  email: "",
  targetRole: "",
  experienceLevel: "Beginner",
  skills: [],
  location: "",
  bio: "",
};

/* ---------- Resume analysis ---------- */
export const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  atsCompatibility: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()).min(1).max(8),
  improvements: z.array(z.string()).min(1).max(8),
  missingSkills: z.array(z.string()).max(10),
  suggestions: z.array(z.string()).min(1).max(8),
  extractedSkills: z.array(z.string()).max(40),
  suggestedRoles: z.array(z.string()).max(6),
});
export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

/* ---------- Roadmap ---------- */
export const roadmapSchema = z.object({
  title: z.string(),
  duration: z.string(),
  overview: z.string(),
  phases: z
    .array(
      z.object({
        title: z.string(),
        duration: z.string(),
        goal: z.string(),
        skills: z
          .array(
            z.object({
              name: z.string(),
              hours: z.number().int().min(1).max(400),
              resource: z.string().default(""),
            }),
          )
          .min(1)
          .max(8),
      }),
    )
    .min(2)
    .max(6),
});
export type Roadmap = z.infer<typeof roadmapSchema>;

export const roadmapRequestSchema = z.object({
  career: z.string().min(2).max(100),
  level: z.enum(experienceLevels),
  hoursPerWeek: z.enum(["5-10", "10-20", "20+"]),
  profile: profileSchema.optional(),
});

/* ---------- Career recommendations (dashboard) ---------- */
export const careersSchema = z.object({
  careers: z
    .array(
      z.object({
        title: z.string(),
        fit: z.number().min(0).max(100),
        salaryRange: z.string(),
        demand: z.enum(["Very High", "High", "Medium", "Low"]),
        reason: z.string(),
      }),
    )
    .min(3)
    .max(6),
});
export type CareerRecommendation = z.infer<typeof careersSchema>["careers"][number];

export const careersRequestSchema = z.object({
  profile: profileSchema,
  resumeSkills: z.array(z.string().max(60)).max(40).optional(),
});

/* ---------- Job / role matches ---------- */
export const jobsSchema = z.object({
  jobs: z
    .array(
      z.object({
        title: z.string(),
        companyType: z.string(),
        workMode: z.enum(["Remote", "Hybrid", "On-site"]),
        employment: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
        seniority: z.enum(["Entry-level", "Mid-level", "Senior"]),
        salaryRange: z.string(),
        matchScore: z.number().min(0).max(100),
        description: z.string(),
        requirements: z.array(z.string()).max(8),
        whyMatch: z.string(),
        searchQuery: z.string(),
      }),
    )
    .min(3)
    .max(10),
});
export type JobMatch = z.infer<typeof jobsSchema>["jobs"][number];

export const jobsRequestSchema = z.object({
  profile: profileSchema,
  resumeSkills: z.array(z.string().max(60)).max(40).optional(),
});

/* ---------- Chat ---------- */
export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
  profile: profileSchema.optional(),
});

/* ---------- History ---------- */
export type HistoryType = "resume" | "roadmap" | "chat" | "careers" | "jobs";
export interface HistoryItem {
  id: string;
  type: HistoryType;
  title: string;
  summary: string;
  createdAt: string; // ISO
}

export interface SavedRoadmap extends Roadmap {
  id: string;
  createdAt: string;
  career: string;
  level: ExperienceLevel;
  hoursPerWeek: string;
  /** key = `${phaseIndex}:${skillIndex}` */
  completed: Record<string, boolean>;
}
