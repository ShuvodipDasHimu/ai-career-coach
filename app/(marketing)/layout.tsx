import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col px-4 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Header />
      </div>
      <main className="mx-auto w-full max-w-7xl flex-grow">{children}</main>
      <div className="mx-auto w-full max-w-7xl">
        <Footer />
      </div>
    </div>
  );
}
