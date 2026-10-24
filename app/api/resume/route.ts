import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { generateJson, PROFILE_PREAMBLE, type AiContent } from "@/lib/ai";
import { handleError, rateLimit, tooMany } from "@/lib/api";
import { resumeAnalysisSchema } from "@/lib/schemas";

export const runtime = "nodejs";
export const maxDuration = 60;

// Vercel serverless request bodies are capped at ~4.5MB.
const MAX_BYTES = 4 * 1024 * 1024;

const SYSTEM = `You are a senior technical recruiter and ATS expert reviewing a resume.
${PROFILE_PREAMBLE}

Score honestly: a typical resume is 55-75. Only give 85+ to genuinely excellent resumes.
Base every point on what is actually in the resume. Do not invent experience.
If a target role is given, judge fit and missing skills against it; otherwise infer the most likely role.

Return JSON with exactly these keys:
{
  "overallScore": number 0-100,
  "atsCompatibility": number 0-100 (parsing-friendliness, standard headings, keywords, formatting),
  "summary": string (2-3 sentences),
  "strengths": string[] (3-6, specific),
  "improvements": string[] (3-6, specific and actionable),
  "missingSkills": string[] (skills/keywords the target role expects that are absent),
  "suggestions": string[] (3-6 concrete rewrites or additions),
  "extractedSkills": string[] (technical and professional skills found in the resume),
  "suggestedRoles": string[] (2-5 job titles this person is a good fit for)
}`;

export async function POST(req: Request) {
  if (!rateLimit(req, 10)) return tooMany();
  try {
    const form = await req.formData();
    const file = form.get("file");
    const targetRole = String(form.get("targetRole") ?? "").slice(0, 100);

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Please upload a resume file." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File is too large (max 4 MB)." }, { status: 413 });
    }

    const name = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    const intro = targetRole ? `Target role: ${targetRole}\n\nAnalyze this resume.` : "Analyze this resume.";
    let content: AiContent;

    if (name.endsWith(".pdf") || file.type === "application/pdf") {
      // The model reads PDFs natively (text + layout), which also helps judge ATS formatting.
      content = { text: intro, pdfBase64: buffer.toString("base64") };
    } else if (name.endsWith(".docx")) {
      const { value } = await mammoth.extractRawText({ buffer });
      if (value.trim().length < 50) {
        return NextResponse.json({ error: "Couldn't read any text from that DOCX." }, { status: 422 });
      }
      content = `${intro}\n\n<resume>\n${value.slice(0, 30_000)}\n</resume>`;
    } else if (name.endsWith(".txt") || file.type === "text/plain") {
      content = `${intro}\n\n<resume>\n${buffer.toString("utf8").slice(0, 30_000)}\n</resume>`;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Upload a PDF, DOCX or TXT (legacy .doc is not supported)." },
        { status: 415 },
      );
    }

    const analysis = await generateJson({ system: SYSTEM, user: content, schema: resumeAnalysisSchema, maxTokens: 2500 });
    return NextResponse.json({ analysis });
  } catch (err) {
    return handleError(err);
  }
}
