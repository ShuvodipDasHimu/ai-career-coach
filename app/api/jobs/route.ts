import { NextResponse } from "next/server";
import { generateJson, PROFILE_PREAMBLE } from "@/lib/ai";
import { handleError, rateLimit, tooMany } from "@/lib/api";
import { jobsRequestSchema, jobsSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are a job-search strategist. Suggest 6-8 realistic role matches for this person.
${PROFILE_PREAMBLE}

IMPORTANT: You do not have access to live job boards. Do NOT invent specific company names or claim a posting exists.
Describe the TYPE of employer instead (e.g. "Series A fintech startup", "Large e-commerce company").
"matchScore" is honest (0-100) based on the person's actual skills. "requirements" lists skills the role typically needs.
"whyMatch" is one sentence citing their skills (and the key gap, if any).
"searchQuery" is a short keyword string that would work in a job board search.
Salary should be an approximate range for their location, stating the currency.

Return JSON: { "jobs": [{ "title", "companyType", "workMode": "Remote"|"Hybrid"|"On-site", "employment": "Full-time"|"Part-time"|"Contract"|"Internship", "seniority": "Entry-level"|"Mid-level"|"Senior", "salaryRange", "matchScore", "description", "requirements": string[], "whyMatch", "searchQuery" }] }`;

export async function POST(req: Request) {
  if (!rateLimit(req, 10)) return tooMany();
  try {
    const { profile, resumeSkills } = jobsRequestSchema.parse(await req.json());
    const data = await generateJson({
      system: SYSTEM,
      user: JSON.stringify({ profile, resumeSkills: resumeSkills ?? [] }),
      schema: jobsSchema,
      maxTokens: 3500,
    });
    return NextResponse.json(data);
  } catch (err) {
    return handleError(err);
  }
}
