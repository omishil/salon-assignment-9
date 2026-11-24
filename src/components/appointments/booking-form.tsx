"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type BookedSlot = {
  startTime: string;
  endTime: string;
};

const fieldClassName =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-purple-950 outline-none transition placeholder:text-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10";

function timeToMinutes(time: string) {
  const [hours = "0", minutes = "0"] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function rangesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) {
  return timeToMinutes(startA) < timeToMinutes(endB) &&
    timeToMinutes(endA) > timeToMinutes(startB);
}

export default function BookingForm({
  serviceId,
  serviceName,
  hourlyRate,
  apiUrl,
  userId,
  userName,
  userEmail,
  minDate,
}: {
  serviceId: string;
  serviceName: string;
  hourlyRate: number;
  apiUrl: string;
  userId?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  minDate: string;
}) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isCheckingSlots, setIsCheckingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignedIn = Boolean(userId);

  async function loadBookedSlots(selectedDate: string) {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    setIsCheckingSlots(true);

    try {
      const response = await fetch(
        `${apiUrl}/appointments/availability?serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(selectedDate)}`,
        { cache: "no-store" },
      );

      const payload = (await response.json()) as {
        success: boolean;
        booked?: BookedSlot[];
      };

      if (!response.ok || !payload.success) {
        throw new Error("Could not load availability");
      }

      setBookedSlots(payload.booked ?? []);
    } catch {
      setBookedSlots([]);
    } finally {
      setIsCheckingSlots(false);
    }
  }

  function handleDateChange(value: string) {
    setDate(value);
    setStartTime("");
    setEndTime("");
    void loadBookedSlots(value);
  }

  const hasInvalidRange = Boolean(
    startTime && endTime && timeToMinutes(endTime) <= timeToMinutes(startTime),
  );

  const bookedMinutes =
    startTime && endTime && !hasInvalidRange
      ? timeToMinutes(endTime) - timeToMinutes(startTime)
      : 0;
  const estimatedTotal =
    bookedMinutes > 0
      ? Math.round((hourlyRate * bookedMinutes) / 60)
      : 0;

  const conflictingSlot = bookedSlots.find(
    (slot) =>
      Boolean(startTime && endTime) &&
      rangesOverlap(startTime, endTime, slot.startTime, slot.endTime),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to book an appointment.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const appointmentDate = String(formData.get("appointmentDate") ?? "");
    const selectedStart = String(formData.get("startTime") ?? "");
    const selectedEnd = String(formData.get("endTime") ?? "");
    const message = String(formData.get("message") ?? "").trim();

    if (!appointmentDate || !selectedStart || !selectedEnd) {
      toast.error("Please choose a date, start time, and end time.");
      return;
    }

    if (timeToMinutes(selectedEnd) <= timeToMinutes(selectedStart)) {
      toast.error("End time must be after the start time.");
      return;
    }

    const overlap = bookedSlots.find((slot) =>
      rangesOverlap(selectedStart, selectedEnd, slot.startTime, slot.endTime),
    );

    if (overlap) {
      toast.error(
        `That time overlaps ${overlap.startTime} - ${overlap.endTime}.`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          appointmentDate,
          startTime: selectedStart,
          endTime: selectedEnd,
          message,
          userId,
          userName,
          userEmail,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.success) {
        toast.error(payload.message ?? "Could not book appointment.");
        return;
      }

      toast.success("Appointment requested successfully.");
      router.push("/dashboard/customer?booked=1");
      router.refresh();
    } catch {
      toast.error("Could not reach the salon server.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            value={date}
            onChange={(event) => handleDateChange(event.target.value)}
            disabled={isSubmitting}
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
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                disabled={isSubmitting}
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
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                disabled={isSubmitting}
                className={fieldClassName}
              />
            </div>
          </div>

          {isCheckingSlots ? (
            <p className="mt-1.5 text-xs text-purple-400">
              Checking availability...
            </p>
          ) : conflictingSlot ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              Overlaps with {conflictingSlot.startTime} -{" "}
              {conflictingSlot.endTime}. Choose another time.
            </p>
          ) : hasInvalidRange ? (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              End time must be after the start time.
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-purple-400">
              Pick any start and end time that works for you.
            </p>
          )}

          {bookedMinutes > 0 ? (
            <p className="mt-2 text-sm font-semibold text-purple-900">
              Estimated total: {estimatedTotal.toLocaleString()}
              <span className="ml-2 text-xs font-normal text-purple-500">
                {bookedMinutes} min × {hourlyRate.toLocaleString()}/hr
              </span>
            </p>
          ) : null}

          {date ? (
            <div className="mt-3 rounded-lg border border-purple-100 bg-purple-50/60 p-3">
              <p className="text-xs font-semibold text-purple-800">
                Booked for this date
              </p>
              {bookedSlots.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {bookedSlots.map((slot) => (
                    <span
                      key={`${slot.startTime}-${slot.endTime}`}
                      className="rounded-full bg-white px-2.5 py-1 text-xs text-purple-700"
                    >
                      {slot.startTime} - {slot.endTime}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-xs text-purple-500">
                  No booked times yet.
                </p>
              )}
            </div>
          ) : null}
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
            disabled={isSubmitting}
            className="w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-purple-950 outline-none transition placeholder:text-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!isSignedIn || isSubmitting || Boolean(conflictingSlot) || hasInvalidRange}
          className="h-11 w-full rounded-lg bg-purple-900 text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Confirm Appointment"}
        </Button>

        {!isSignedIn ? (
          <p className="text-center text-xs text-purple-500">
            Please sign in before confirming your appointment.
          </p>
        ) : null}
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
