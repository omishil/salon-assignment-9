import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Scissors,
  Settings,
  Sparkles,
  UserRound,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

const sidebarLinks = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "My Bookings", icon: CalendarDays, active: false },
  { label: "Book a Service", icon: Scissors, active: false },
  { label: "Profile", icon: UserRound, active: false },
  { label: "Settings", icon: Settings, active: false },
];

type Appointment = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  hourlyRate?: number;
  bookedMinutes?: number;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  appointmentStatus: "Pending" | "Confirmed" | "Cancelled";
  paymentStatus: "Unpaid" | "Paid";
};

type BadgeStyle = {
  icon: LucideIcon;
  className: string;
};

const appointmentStatusStyles: Record<string, BadgeStyle> = {
  Pending: {
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  Confirmed: {
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  Cancelled: {
    icon: XCircle,
    className: "border-gray-200 bg-gray-100 text-gray-600",
  },
};

const paymentStatusStyles: Record<string, BadgeStyle> = {
  Unpaid: {
    icon: Wallet,
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  Paid: {
    icon: BadgeCheck,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

function StatusBadge({
  status,
  styles,
}: {
  status: string;
  styles: Record<string, BadgeStyle>;
}) {
  const style = styles[status] ?? {
    icon: Sparkles,
    className: "border-purple-200 bg-purple-50 text-purple-700",
  };
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function DashboardPage() {
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
            Welcome back
            {session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            Manage your upcoming appointments and explore new services.
          </p>
        </div>

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
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-purple-50/60 text-[11px] font-semibold uppercase tracking-wide text-purple-400">
                <tr>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Appointment</th>
                  <th className="px-5 py-3">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {appointments.length ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="text-purple-800">
                      <td className="px-5 py-4 font-semibold text-purple-950">
                        {appointment.serviceName}
                      </td>
                      <td className="px-5 py-4 text-purple-700/80">
                        {appointment.category}
                      </td>
                      <td className="px-5 py-4 text-purple-700/80">
                        {formatDate(appointment.appointmentDate)}
                      </td>
                      <td className="px-5 py-4 text-purple-700/80">
                        {appointment.startTime} - {appointment.endTime}
                        {appointment.bookedMinutes ? (
                          <span className="mt-0.5 block text-xs text-purple-400">
                            {appointment.bookedMinutes} min
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 font-medium text-purple-950">
                        {appointment.price.toLocaleString()}
                        {appointment.hourlyRate ? (
                          <span className="mt-0.5 block text-xs font-normal text-purple-400">
                            {appointment.hourlyRate.toLocaleString()}/hr
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={appointment.appointmentStatus}
                          styles={appointmentStatusStyles}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={appointment.paymentStatus}
                          styles={paymentStatusStyles}
                        />
                      </td>
                    </tr>
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
      </section>
    </main>
  );
}
