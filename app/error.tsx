"use client";

import { Button } from "@/components/ui";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md rounded-lg border border-gray-700 bg-gray-800 p-8 text-center shadow-lg">
        <h1 className="mb-3 text-2xl font-bold">Something went wrong</h1>
        <p className="mb-6 text-sm text-gray-400">{error.message || "An unexpected error occurred."}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
