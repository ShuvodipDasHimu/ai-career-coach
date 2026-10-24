import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AiConfigError } from "./ai";

/** Naive in-memory limiter: good enough for a demo, use Upstash/Redis for real traffic. */
const hits = new Map<string, number[]>();
export function rateLimit(req: Request, limit = 20, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export function tooMany() {
  return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });
}

export function handleError(err: unknown) {
  if (err instanceof AiConfigError) {
    return NextResponse.json({ error: err.message, code: "AI_NOT_CONFIGURED" }, { status: 503 });
  }
  if (err instanceof ZodError) {
    return NextResponse.json({ error: "Invalid request.", details: err.issues.slice(0, 5) }, { status: 400 });
  }
  console.error("[api]", err);
  const message = err instanceof Error ? err.message : "Something went wrong.";
  return NextResponse.json({ error: message }, { status: 500 });
}
