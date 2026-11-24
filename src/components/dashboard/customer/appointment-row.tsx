"use client";

import { Ban } from "lucide-react";

import {
  appointmentStatusStyles,
  formatDate,
  paymentStatusStyles,
  StatusBadge,
  type Appointment,
} from "@/components/dashboard/shared/appointment-badges";
import CancelBookingDialog from "@/components/dashboard/customer/cancel-booking-dialog";

function CancelledLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 text-[10px] text-gray-500 sm:text-xs ${className}`}
    >
      <Ban className="size-3.5" />
      Cancelled
    </span>
  );
}

export default function AppointmentRow({
  appointment,
  apiUrl,
  showActions = false,
}: {
  appointment: Appointment;
  apiUrl: string;
  showActions?: boolean;
}) {
  const isCancelled = appointment.appointmentStatus === "Cancelled";

  return (
    <tr className="text-purple-800 align-top">
      <td className="px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3 md:block">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-purple-950 sm:text-sm">
              {appointment.serviceName}
            </p>

            <div className="mt-1.5 space-y-1 text-[11px] text-purple-500 md:hidden">
              <p>
                {formatDate(appointment.appointmentDate)} ·{" "}
                {appointment.startTime} - {appointment.endTime}
                {appointment.bookedMinutes
                  ? ` · ${appointment.bookedMinutes} min`
                  : ""}
              </p>
              <p>
                {appointment.price.toLocaleString()}
                {appointment.hourlyRate
                  ? ` · ${appointment.hourlyRate.toLocaleString()}/hr`
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex w-28 shrink-0 flex-col items-stretch gap-1.5 md:hidden">
            <StatusBadge
              status={appointment.appointmentStatus}
              styles={appointmentStatusStyles}
              className="w-full"
            />
            <StatusBadge
              status={appointment.paymentStatus}
              styles={paymentStatusStyles}
              className="w-full"
            />
            {showActions ? (
              isCancelled ? (
                <CancelledLabel className="w-full" />
              ) : (
                <CancelBookingDialog
                  apiUrl={apiUrl}
                  appointment={appointment}
                />
              )
            ) : null}
          </div>
        </div>
      </td>

      <td className="hidden px-5 py-4 text-purple-700/80 md:table-cell">
        {appointment.category}
      </td>
      <td className="hidden px-5 py-4 text-purple-700/80 md:table-cell">
        {formatDate(appointment.appointmentDate)}
      </td>
      <td className="hidden px-5 py-4 text-purple-700/80 md:table-cell">
        {appointment.startTime} - {appointment.endTime}
        {appointment.bookedMinutes ? (
          <span className="mt-0.5 block text-xs text-purple-400">
            {appointment.bookedMinutes} min
          </span>
        ) : null}
      </td>
      <td className="hidden px-5 py-4 font-medium text-purple-950 md:table-cell">
        {appointment.price.toLocaleString()}
        {appointment.hourlyRate ? (
          <span className="mt-0.5 block text-xs font-normal text-purple-400">
            {appointment.hourlyRate.toLocaleString()}/hr
          </span>
        ) : null}
      </td>
      <td className="hidden px-5 py-4 md:table-cell">
        <StatusBadge
          status={appointment.appointmentStatus}
          styles={appointmentStatusStyles}
        />
      </td>
      <td className="hidden px-5 py-4 md:table-cell">
        <StatusBadge
          status={appointment.paymentStatus}
          styles={paymentStatusStyles}
        />
      </td>

      {showActions ? (
        <td className="hidden px-5 py-4 md:table-cell">
          {isCancelled ? (
            <CancelledLabel />
          ) : (
            <CancelBookingDialog apiUrl={apiUrl} appointment={appointment} />
          )}
        </td>
      ) : null}
    </tr>
  );
}
