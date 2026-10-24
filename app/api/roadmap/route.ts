import { NextResponse } from "next/server";
import { generateJson, PROFILE_PREAMBLE } from "@/lib/ai";
import { handleError, rateLimit, tooMany } from "@/lib/api";
import { roadmapRequestSchema, roadmapSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are an expert career mentor who builds realistic, project-driven learning roadmaps.
${PROFILE_PREAMBLE}

Rules:
- 3-5 phases ordered from foundations to portfolio/job-readiness. Skills within a phase are concrete (e.g. "REST API design with FastAPI"), not vague ("backend").
- Skip things the user's level/skills indicate they already know.
- Sum of hours must be consistent with the weekly time commitment and the stated duration.
- "resource" is a short pointer to a type of resource or well-known free course/doc (no URLs).
- Every phase ends with something buildable (project or deliverable) mentioned in "goal".

Return JSON:
{
  "title": string,
  "duration": string (e.g. "6-9 months"),
  "overview": string (2 sentences),
  "phases": [{ "title": string, "duration": string, "goal": string, "skills": [{ "name": string, "hours": integer, "resource": string }] }]
}`;

export async function POST(req: Request) {
  if (!rateLimit(req, 10)) return tooMany();
  try {
    const body = roadmapRequestSchema.parse(await req.json());
    const { career, level, hoursPerWeek, profile } = body;
    const known = profile?.skills.length ? `Skills they already have: ${profile.skills.join(", ")}.` : "";
    const roadmap = await generateJson({
      system: SYSTEM,
      user: `Career goal: ${career}\nCurrent level: ${level}\nTime available: ${hoursPerWeek} hours/week\n${known}`,
      schema: roadmapSchema,
      maxTokens: 3500,
    });
    return NextResponse.json({ roadmap });
  } catch (err) {
    return handleError(err);
  }
}
