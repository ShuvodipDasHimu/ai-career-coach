import { NextResponse } from "next/server";
import { generateJson, PROFILE_PREAMBLE } from "@/lib/ai";
import { handleError, rateLimit, tooMany } from "@/lib/api";
import { careersRequestSchema, careersSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are a labour-market-aware career advisor.
${PROFILE_PREAMBLE}

Recommend 3-5 careers that fit the person's skills, level and interests. "fit" is an honest 0-100 estimate
(rarely above 90). "salaryRange" is an approximate annual range for their location/market, in local currency
if known (state the currency), otherwise USD. "reason" is one sentence tied to their actual skills.

Return JSON: { "careers": [{ "title": string, "fit": number, "salaryRange": string, "demand": "Very High"|"High"|"Medium"|"Low", "reason": string }] }`;

export async function POST(req: Request) {
  if (!rateLimit(req, 15)) return tooMany();
  try {
    const { profile, resumeSkills } = careersRequestSchema.parse(await req.json());
    const data = await generateJson({
      system: SYSTEM,
      user: JSON.stringify({ profile, resumeSkills: resumeSkills ?? [] }),
      schema: careersSchema,
      maxTokens: 1500,
    });
    return NextResponse.json(data);
  } catch (err) {
    return handleError(err);
  }
}
