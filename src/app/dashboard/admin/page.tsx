import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user?.role !== "admin") {
    redirect("/dashboard/customer");
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-purple-700">
        <Sparkles className="size-3.5" />
        Admin dashboard
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
        Admin overview
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
        Admin tools will be added here.
      </p>
    </main>
  );
}
