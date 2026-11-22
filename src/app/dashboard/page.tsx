import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  CalendarDays,
  LayoutDashboard,
  Scissors,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

const sidebarLinks = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "My Bookings", icon: CalendarDays, active: false },
  { label: "Book a Service", icon: Scissors, active: false },
  { label: "Profile", icon: UserRound, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role ?? "customer";

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
      <aside className="w-full shrink-0 md:w-60">
        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
              Account
            </p>
            <p className="mt-1 text-sm font-semibold capitalize text-purple-950">
              {role} dashboard
            </p>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarLinks.map(({ label, icon: Icon, active }) => (
              <div
                key={label}
                className={
                  active
                    ? "flex items-center gap-3 rounded-xl bg-purple-900 px-3 py-2.5 text-sm font-medium text-white"
                    : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-purple-700/70"
                }
              >
                <Icon className="size-4" />
                {label}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <section className="flex-1 space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-purple-700">
            <Sparkles className="size-3.5" />
            Customer dashboard
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Welcome back{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            Manage your upcoming appointments and explore new services.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Upcoming appointments", "Completed visits", "Saved services"].map(
            (title) => (
              <div
                key={title}
                className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-purple-700/70">{title}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-purple-950">
                  0
                </p>
              </div>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
