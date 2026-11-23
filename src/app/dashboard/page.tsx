import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import {
  CalendarDays,
  LayoutDashboard,
  Scissors,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";

import type { Appointment } from "@/components/dashboard/appointment-badges";
import AppointmentRow from "@/components/dashboard/appointment-row";
import AppointmentSummaryCards from "@/components/dashboard/appointment-summary-cards";
import BookingsTable from "@/components/dashboard/bookings-table";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

const sidebarLinks = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    key: "overview",
    href: "/dashboard",
  },
  {
    label: "My Bookings",
    icon: CalendarDays,
    key: "bookings",
    href: "/dashboard?view=bookings",
  },
  {
    label: "Book a Service",
    icon: Scissors,
    key: "service",
    href: null,
  },
  {
    label: "Profile",
    icon: UserRound,
    key: "profile",
    href: null,
  },
  {
    label: "Settings",
    icon: Settings,
    key: "settings",
    href: null,
  },
];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const activeView = view === "bookings" ? "bookings" : "overview";

  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role ?? "customer";

  let appointments: Appointment[] = [];

  try {
    if (session?.user?.id) {
      const response = await fetch(
        `${API_URL}/appointments?userId=${encodeURIComponent(session.user.id)}`,
        { cache: "no-store" },
      );

      if (response.ok) {
        const payload = (await response.json()) as {
          success: boolean;
          data: Appointment[];
        };
        appointments = payload.data ?? [];
      }
    }
  } catch {
    appointments = [];
  }

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
            {sidebarLinks.map(({ label, icon: Icon, key, href }) => {
              const className =
                key === activeView
                  ? "flex items-center gap-3 rounded-xl bg-purple-900 px-3 py-2.5 text-sm font-medium text-white"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-purple-700/70";
              const content = (
                <>
                  <Icon className="size-4" />
                  {label}
                </>
              );

              return href ? (
                <Link key={label} href={href} className={className}>
                  {content}
                </Link>
              ) : (
                <div key={label} className={className}>
                  {content}
                </div>
              );
            })}
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
            Welcome back
            {session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            Manage your upcoming appointments and explore new services.
          </p>
        </div>

        {activeView === "bookings" ? (
          <BookingsTable appointments={appointments} apiUrl={API_URL} />
        ) : (
          <div className="space-y-6">
            <AppointmentSummaryCards appointments={appointments} />

            <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 px-5 py-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-purple-950">
                    Overview
                  </h2>
                  <p className="mt-1 text-sm text-purple-700/70">
                    Salon services you have booked.
                  </p>
                </div>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                  {appointments.length}{" "}
                  {appointments.length === 1 ? "booking" : "bookings"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-purple-50/60 text-[10px] font-semibold uppercase tracking-wide text-purple-400 sm:text-[11px]">
                    <tr>
                      <th className="px-4 py-3 sm:px-5">Service</th>
                      <th className="hidden px-5 py-3 md:table-cell">Category</th>
                      <th className="hidden px-5 py-3 md:table-cell">Date</th>
                      <th className="hidden px-5 py-3 md:table-cell">Time</th>
                      <th className="hidden px-5 py-3 md:table-cell">Price</th>
                      <th className="hidden px-5 py-3 md:table-cell">
                        Appointment
                      </th>
                      <th className="hidden px-5 py-3 md:table-cell">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {appointments.length ? (
                      appointments.map((appointment) => (
                        <AppointmentRow
                          key={appointment._id}
                          appointment={appointment}
                          apiUrl={API_URL}
                        />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-12 text-center text-purple-700/70"
                        >
                          No bookings yet.{" "}
                          <Link
                            href="/services"
                            className="font-semibold text-purple-800 underline underline-offset-4"
                          >
                            Browse services
                          </Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
