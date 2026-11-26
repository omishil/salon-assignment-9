"use client";

import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Dialog } from "radix-ui";
import { toast } from "sonner";

import { deleteService } from "@/app/dashboard/admin/actions";
import type { Service } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";

export default function DeleteServiceDialog({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const result = await deleteService(service._id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Service deleted.");
      setOpen(false);
    } catch {
      toast.error("Failed to delete service. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="destructive"
          size="icon-sm"
          aria-label={`Delete ${service.serviceName}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-purple-950/40 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-purple-100 bg-white p-6 shadow-xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          onEscapeKeyDown={(event) => {
            if (isDeleting) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (isDeleting) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (isDeleting) event.preventDefault();
          }}
        >
          <Dialog.Title className="font-display text-xl font-semibold text-purple-950">
            Delete this service?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-purple-700/70">
            <span className="font-medium text-purple-900">
              {service.serviceName}
            </span>{" "}
            will be permanently removed from the service list. This cannot be
            undone.
          </Dialog.Description>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Dialog.Close asChild>
              <Button type="button" variant="outline" disabled={isDeleting}>
                Keep service
              </Button>
            </Dialog.Close>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Trash2 />
              )}
              {isDeleting ? "Deleting..." : "Delete service"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
