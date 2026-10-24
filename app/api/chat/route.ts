import { NextResponse } from "next/server";
import { streamChat, PROFILE_PREAMBLE } from "@/lib/ai";
import { handleError, rateLimit, tooMany } from "@/lib/api";
import { chatRequestSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM = `You are an AI Career Coach: practical, warm, and direct. You help with career paths, skills,
resumes, interviews, job search, salary negotiation and growth.
${PROFILE_PREAMBLE}

Style: give specific, actionable advice in short paragraphs or tight bullet lists (plain markdown, no headings).
Ask at most one clarifying question, and only when it would materially change the advice.
Don't claim to have live market data. Don't give legal, tax or medical advice; suggest a professional for those.`;

export async function POST(req: Request) {
  if (!rateLimit(req, 30)) return tooMany();
  try {
    const { messages, profile } = chatRequestSchema.parse(await req.json());

    const context = profile && (profile.targetRole || profile.skills.length || profile.location)
      ? `\n\nAbout the user (data): ${JSON.stringify({
          targetRole: profile.targetRole,
          level: profile.experienceLevel,
          skills: profile.skills,
          location: profile.location,
        })}`
      : "";

    // Conversation must start with a user turn.
    const trimmed = messages.slice(-20);
    while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
    if (!trimmed.length) return NextResponse.json({ error: "No user message." }, { status: 400 });

    const body = streamChat(SYSTEM + context, trimmed);

    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    return handleError(err);
  }
}
