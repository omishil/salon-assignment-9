"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, XCircle } from "lucide-react";
import { Dialog } from "radix-ui";
import { toast } from "sonner";

import {
  formatDate,
  type Appointment,
} from "@/components/dashboard/shared/appointment-badges";
import { Button } from "@/components/ui/button";

export default function CancelBookingDialog({
  apiUrl,
  appointment,
}: {
  apiUrl: string;
  appointment: Appointment;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  async function handleCancel() {
    setIsCancelling(true);

    try {
      const response = await fetch(
        `${apiUrl}/appointments/${encodeURIComponent(appointment._id)}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: appointment.userId }),
        },
      );

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.success) {
        toast.error(payload.message ?? "Could not cancel appointment.");
        return;
      }

      toast.success("Appointment cancelled.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not reach the salon server.");
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          className="hidden md:inline-flex"
        >
          <XCircle />
          Cancel
        </Button>
      </Dialog.Trigger>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          size="xs"
          variant="destructive"
          className="w-full justify-center text-[10px] md:hidden"
        >
          <XCircle />
          Cancel
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-purple-950/40 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-100 bg-white p-6 shadow-xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          onEscapeKeyDown={(event) => {
            if (isCancelling) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (isCancelling) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (isCancelling) event.preventDefault();
          }}
        >
          <Dialog.Title className="font-display text-xl font-semibold text-purple-950">
            Cancel this appointment?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-purple-700/70">
            <span className="font-medium text-purple-900">
              {appointment.serviceName}
            </span>{" "}
            on {formatDate(appointment.appointmentDate)} at{" "}
            {appointment.startTime} will be cancelled. This cannot be undone.
          </Dialog.Description>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Dialog.Close asChild>
              <Button type="button" variant="outline" disabled={isCancelling}>
                Keep booking
              </Button>
            </Dialog.Close>
            <Button
              type="button"
              variant="destructive"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <XCircle />
              )}
              {isCancelling ? "Cancelling..." : "Cancel appointment"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
