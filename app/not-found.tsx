import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-9xl font-extrabold text-indigo-500">404</h1>
        <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
        <p className="mb-6 text-gray-400">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/dashboard"
          className="inline-block rounded-full bg-indigo-500 px-6 py-2 font-semibold text-white transition hover:brightness-110"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
