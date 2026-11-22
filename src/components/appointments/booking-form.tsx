"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Mail, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const fieldClassName =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-purple-950 outline-none transition placeholder:text-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10";

export default function BookingForm({
  serviceName,
  userName,
  userEmail,
  minDate,
}: {
  serviceName: string;
  userName?: string | null;
  userEmail?: string | null;
  minDate: string;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const startTime = String(formData.get("startTime") ?? "");
    const endTime = String(formData.get("endTime") ?? "");

    if (!startTime || !endTime) {
      toast.error("Please choose a start and end time.");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be after the start time.");
      return;
    }

    toast.info("Booking submission will be enabled soon.");
  }

  const isSignedIn = Boolean(userName || userEmail);

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="appointmentDate"
            className="mb-1.5 block text-sm font-medium text-purple-950"
          >
            Appointment Date
          </label>
          <input
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            min={minDate}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <p className="mb-1.5 block text-sm font-medium text-purple-950">
            Preferred Time
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="startTime"
                className="mb-1 block text-xs text-purple-500"
              >
                From
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                required
                className={fieldClassName}
              />
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="mb-1 block text-xs text-purple-500"
              >
                To
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                required
                className={fieldClassName}
              />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-purple-400">
            Pick any start and end time that works for you.
          </p>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-purple-950"
          >
            Additional Message{" "}
            <span className="font-normal text-purple-400">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={500}
            placeholder={`Anything we should know before your ${serviceName} appointment?`}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-purple-950 outline-none transition placeholder:text-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-lg bg-purple-900 text-white hover:bg-purple-800"
        >
          Confirm Appointment
        </Button>
      </form>

      <div className="mt-6 border-t border-purple-100 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
          Booking as
        </p>

        {isSignedIn ? (
          <div className="mt-3 space-y-2">
            <p className="flex items-center gap-2 text-sm font-medium text-purple-950">
              <UserRound className="size-4 text-purple-600" />
              {userName || "SalonBook customer"}
            </p>
            <p className="flex items-center gap-2 text-sm text-purple-700/80">
              <Mail className="size-4 text-purple-500" />
              {userEmail || "No email on file"}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-purple-700/80">
            <Link
              href="/signin"
              className="font-semibold text-purple-800 underline underline-offset-4"
            >
              Sign in
            </Link>{" "}
            to see your name and email here.
          </p>
        )}
      </div>
    </div>
  );
}
