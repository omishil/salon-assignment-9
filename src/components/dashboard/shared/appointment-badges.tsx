import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Sparkles,
  Wallet,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export type Appointment = {
  _id: string;
  userId: string;
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

export const appointmentStatusStyles: Record<string, BadgeStyle> = {
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

export const paymentStatusStyles: Record<string, BadgeStyle> = {
  Unpaid: {
    icon: Wallet,
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  Paid: {
    icon: BadgeCheck,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

export function StatusBadge({
  status,
  styles,
  className = "w-fit",
}: {
  status: string;
  styles: Record<string, BadgeStyle>;
  className?: string;
}) {
  const style = styles[status] ?? {
    icon: Sparkles,
    className: "border-purple-200 bg-purple-50 text-purple-700",
  };
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex ${className} items-center justify-center gap-1.5 rounded-full border px-2 py-0.5 text-center text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${style.className}`}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

export function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
