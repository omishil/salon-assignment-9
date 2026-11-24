import { CheckCircle2, Clock3, XCircle, type LucideIcon } from "lucide-react";

import type { Appointment } from "@/components/dashboard/shared/appointment-badges";

type StatusCard = {
  status: Appointment["appointmentStatus"];
  label: string;
  icon: LucideIcon;
  iconClassName: string;
};

const statusCards: StatusCard[] = [
  {
    status: "Pending",
    label: "Pending",
    icon: Clock3,
    iconClassName: "bg-amber-50 text-amber-700",
  },
  {
    status: "Confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    status: "Cancelled",
    label: "Cancelled",
    icon: XCircle,
    iconClassName: "bg-gray-100 text-gray-600",
  },
];

export default function AppointmentSummaryCards({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {statusCards.map(({ status, label, icon: Icon, iconClassName }) => {
        const count = appointments.filter(
          (appointment) => appointment.appointmentStatus === status,
        ).length;

        return (
          <div
            key={status}
            className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-purple-700/70">
                  {label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-purple-950">
                  {count}
                </p>
              </div>
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
              >
                <Icon className="size-4" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
