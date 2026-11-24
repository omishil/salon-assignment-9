import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard, Sparkles, UserRound } from "lucide-react";

import ProfilePanel from "@/components/dashboard/shared/profile-panel";
import { auth } from "@/lib/auth";
import { toProfileUser } from "@/lib/profile-user";
import { ADMIN_DASHBOARD, CUSTOMER_DASHBOARD } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

const sidebarLinks = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    key: "overview",
    href: ADMIN_DASHBOARD,
  },
  {
    label: "Profile",
    icon: UserRound,
    key: "profile",
    href: `${ADMIN_DASHBOARD}?view=profile`,
  },
];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const activeView = view === "profile" ? "profile" : "overview";

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    redirect(CUSTOMER_DASHBOARD);
  }

  const profileUser = toProfileUser(session);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
      <aside className="w-full shrink-0 md:w-60">
        <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
              Account
            </p>
            <p className="mt-1 text-sm font-semibold text-purple-950">
              Admin dashboard
            </p>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarLinks.map(({ label, icon: Icon, key, href }) => {
              const className =
                key === activeView
                  ? "flex items-center gap-3 rounded-xl bg-purple-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm shadow-purple-900/20"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-purple-800 transition hover:bg-purple-50 hover:text-purple-950";

              return (
                <Link key={label} href={href} className={className}>
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <section className="flex-1 space-y-6">
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
        ) : (
          <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-purple-950">
              Admin overview
            </h2>
            <p className="mt-2 text-sm text-purple-700/70">
              Admin tools will be added here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
