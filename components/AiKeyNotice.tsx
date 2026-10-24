import { ErrorNote } from "@/components/ui";

/** Shows a friendlier hint when the server says the API key is missing. */
export function AiError({ message }: { message: string }) {
  const missingKey = /ANTHROPIC_API_KEY/.test(message);
  return (
    <ErrorNote>
      {missingKey ? (
        <>
          The AI backend isn&apos;t configured yet. Copy <code className="rounded bg-gray-900 px-1">.env.example</code> to{" "}
          <code className="rounded bg-gray-900 px-1">.env.local</code>, add your <code>ANTHROPIC_API_KEY</code>, and restart{" "}
          <code className="rounded bg-gray-900 px-1">npm run dev</code>.
        </>
      ) : (
        message
      )}
    </ErrorNote>
  );
}
