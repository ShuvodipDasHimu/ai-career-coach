import { Suspense } from "react";
import type { Metadata } from "next";
import { Spinner } from "@/components/ui";
import { RoadmapClient } from "./RoadmapClient";

export const metadata: Metadata = { title: "Roadmap Generator" };

export default function RoadmapPage() {
  return (
    <Suspense fallback={<Spinner label="Loading…" />}>
      <RoadmapClient />
    </Suspense>
  );
}
