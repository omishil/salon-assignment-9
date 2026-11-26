import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  CirclePlus,
  CreditCard,
  LayoutDashboard,
  Scissors,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import AddServiceForm from "@/components/dashboard/admin/add-service-form";
import AdminOverview from "@/components/dashboard/admin/admin-overview";
import ManageServices from "@/components/dashboard/admin/manage-services";
import ProfilePanel from "@/components/dashboard/shared/profile-panel";
import type { Service } from "@/components/services/service-card";
import { auth } from "@/lib/auth";
import { toProfileUser } from "@/lib/profile-user";
import { ADMIN_DASHBOARD, CUSTOMER_DASHBOARD } from "@/lib/routes";

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

type AdminView =
  | "overview"
  | "services"
  | "add-service"
  | "appointments"
  | "users"
  | "transactions"
  | "profile";

type AdminNavItem = {
  label: string;
  key: AdminView;
  icon: LucideIcon;
  href: string;
};

const adminViews: AdminNavItem[] = [
  {
    label: "Overview",
    key: "overview",
    icon: LayoutDashboard,
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Manage Services",
    key: "services",
    icon: Scissors,
    href: `${ADMIN_DASHBOARD}?view=services`,
  },
  {
    label: "Add/Update Service",
    key: "add-service",
    icon: CirclePlus,
    href: `${ADMIN_DASHBOARD}?view=add-service`,
  },
  {
    label: "Manage Appointments",
    key: "appointments",
    icon: CalendarDays,
    href: `${ADMIN_DASHBOARD}?view=appointments`,
  },
  {
    label: "Manage Users",
    key: "users",
    icon: Users,
    href: `${ADMIN_DASHBOARD}?view=users`,
  },
  {
    label: "Transactions",
    key: "transactions",
    icon: CreditCard,
    href: `${ADMIN_DASHBOARD}?view=transactions`,
  },
  {
    label: "Profile",
    key: "profile",
    icon: UserRound,
    href: `${ADMIN_DASHBOARD}?view=profile`,
  },
];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const activeView: AdminView =
    adminViews.find((item) => item.key === view)?.key ?? "overview";
  const activeOption =
    adminViews.find((item) => item.key === activeView) ?? adminViews[0];

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    redirect(CUSTOMER_DASHBOARD);
  }

  const profileUser = toProfileUser(session);

  let services: Service[] = [];

  if (activeView === "services") {
    try {
      const response = await fetch(`${API_URL}/services`, {
        cache: "no-store",
      });

      if (response.ok) {
        const payload = (await response.json()) as {
          success: boolean;
          data: Service[];
        };
        services = payload.data ?? [];
      }
    } catch {
      services = [];
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
      <aside className="w-full shrink-0 md:w-60">
        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm">
          <div className="hidden px-3 pb-3 pt-2 md:block">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
              Account
            </p>
            <p className="mt-1 text-sm font-semibold text-purple-950">
              Admin dashboard
            </p>
          </div>

          <nav className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {adminViews.map(({ label, key, icon: Icon, href }) => {
              const className =
                key === activeView
                  ? "flex shrink-0 items-center gap-2 rounded-xl bg-purple-900 px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-sm shadow-purple-900/20 md:gap-3"
                  : "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-purple-800 transition hover:bg-purple-50 hover:text-purple-950 md:gap-3";

              return (
                <Link key={label} href={href} className={className}>
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <section className="min-w-0 flex-1 space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-purple-700">
            <Sparkles className="size-3.5" />
            Admin dashboard
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Welcome back
            {session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            Manage your salon and account settings from one place.
          </p>
        </div>

        {activeView === "profile" ? (
          <ProfilePanel user={profileUser} />
        ) : activeView === "overview" ? (
          <AdminOverview />
        ) : activeView === "services" ? (
          <ManageServices services={services} />
        ) : activeView === "add-service" ? (
          <AddServiceForm />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-purple-950">
              {activeOption.label}
            </h2>
            <p className="mt-2 text-sm text-purple-700/70">
              This section is not available yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
