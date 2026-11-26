import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Scissors,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type StatCard = {
  label: string;
  icon: LucideIcon;
  iconClassName: string;
};

const statCards: StatCard[] = [
  {
    label: "Total Registered Customers",
    icon: Users,
    iconClassName: "bg-purple-50 text-purple-700",
  },
  {
    label: "Total Active Services",
    icon: Scissors,
    iconClassName: "bg-sky-50 text-sky-700",
  },
  {
    label: "Total Appointment Requests",
    icon: CalendarDays,
    iconClassName: "bg-violet-50 text-violet-700",
  },
  {
    label: "Pending Appointments",
    icon: Clock3,
    iconClassName: "bg-amber-50 text-amber-700",
  },
  {
    label: "Confirmed Appointments",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Total Successful Payments",
    icon: Wallet,
    iconClassName: "bg-rose-50 text-rose-700",
  },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(({ label, icon: Icon, iconClassName }) => (
          <div
            key={label}
            className="rounded-xl border border-purple-100 bg-white p-3 shadow-sm sm:p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-medium leading-snug text-purple-700/70 sm:text-xs">
                {label}
              </p>
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-8 ${iconClassName}`}
              >
                <Icon className="size-3.5 sm:size-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold text-purple-950 sm:text-3xl">
              —
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
        <div className="border-b border-purple-100 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-purple-950">
            Overview
          </h2>
          <p className="mt-1 text-sm text-purple-700/70">
            Table data will be added here.
          </p>
        </div>
        <div className="px-5 py-12 text-center text-sm text-purple-700/70">
          No table data configured yet.
        </div>
      </div>
    </div>
  );
}
