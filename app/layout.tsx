import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";
import { AppDataProvider } from "@/lib/app-data";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI Career Coach", template: "%s · AI Career Coach" },
  description:
    "AI-powered career coach: analyze your resume, generate personalized learning roadmaps, get job-role matches and ask career questions.",
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-white antialiased">
        <AuthProvider>
          <AppDataProvider>{children}</AppDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
