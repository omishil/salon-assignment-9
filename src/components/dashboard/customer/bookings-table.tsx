"use client";

import { useState } from "react";
import Link from "next/link";

import AppointmentRow from "@/components/dashboard/customer/appointment-row";
import type { Appointment } from "@/components/dashboard/shared/appointment-badges";

type Filter = "All" | "Pending" | "Confirmed" | "Cancelled";

const filters: Filter[] = ["All", "Pending", "Confirmed", "Cancelled"];

export default function BookingsTable({
  appointments,
  apiUrl,
}: {
  appointments: Appointment[];
  apiUrl: string;
}) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts: Record<Filter, number> = {
    All: appointments.length,
    Pending: appointments.filter(
      (appointment) => appointment.appointmentStatus === "Pending",
    ).length,
    Confirmed: appointments.filter(
      (appointment) => appointment.appointmentStatus === "Confirmed",
    ).length,
    Cancelled: appointments.filter(
      (appointment) => appointment.appointmentStatus === "Cancelled",
    ).length,
  };

  const visibleAppointments =
    filter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.appointmentStatus === filter,
        );

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-purple-950">
            My Bookings
          </h2>
          <p className="mt-1 text-sm text-purple-700/70">
            All of your salon appointments in one place.
          </p>
        </div>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
          {appointments.length}{" "}
          {appointments.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-purple-100 px-5 py-3">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={
              filter === option
                ? "rounded-full bg-purple-900 px-2.5 py-1.5 text-[11px] font-semibold text-white sm:px-3 sm:text-xs"
                : "rounded-full border border-purple-100 bg-white px-2.5 py-1.5 text-[11px] font-medium text-purple-600 transition hover:bg-purple-50 sm:px-3 sm:text-xs"
            }
          >
            {option}
            <span
              className={
                filter === option
                  ? "ml-1.5 text-purple-200"
                  : "ml-1.5 text-purple-400"
              }
            >
              {counts[option]}
            </span>
          </button>
        ))}
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
              <th className="hidden px-5 py-3 md:table-cell">Appointment</th>
              <th className="hidden px-5 py-3 md:table-cell">Payment</th>
              <th className="hidden px-5 py-3 md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50">
            {visibleAppointments.length ? (
              visibleAppointments.map((appointment) => (
                <AppointmentRow
                  key={appointment._id}
                  appointment={appointment}
                  apiUrl={apiUrl}
                  showActions
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-purple-700/70"
                >
                  {appointments.length ? (
                    `No ${filter.toLowerCase()} bookings.`
                  ) : (
                    <>
                      No bookings yet.{" "}
                      <Link
                        href="/services"
                        className="font-semibold text-purple-800 underline underline-offset-4"
                      >
                        Browse services
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
