import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft, Clock3, Tag } from "lucide-react";

import BookingForm from "@/components/appointments/booking-form";
import type { Service } from "@/components/services/service-card";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Book Appointment",
};

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

export default async function BookAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  const { id } = await params;

  let service: Service | undefined;

  try {
    const response = await fetch(`${API_URL}/services`, {
      cache: "no-store",
    });

    if (response.ok) {
      const payload = (await response.json()) as { data: Service[] };
      service = payload.data?.find((item) => item._id === id);
    }
  } catch {
    service = undefined;
  }

  if (!service) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/services/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition hover:text-purple-900"
      >
        <ArrowLeft className="size-4" />
        Back to service details
      </Link>

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium text-purple-700">
          Appointment booking
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
          Book an Appointment
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-purple-700/70">
          Fill in the details below to request your preferred slot.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-purple-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-400">
              Selected service
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-purple-950">
              {service.serviceName}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            <Tag className="size-3" />
            {service.category}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-purple-100 pt-4 text-sm">
          <p className="text-purple-700/70">
            Hourly rate:{" "}
            <span className="font-semibold text-purple-950">
              {service.price.toLocaleString()}
            </span>
          </p>
          <p className="flex items-center gap-1.5 text-purple-700/70">
            <Clock3 className="size-4 text-purple-500" />
            Duration:{" "}
            <span className="font-semibold text-purple-950">
              {service.duration} min
            </span>
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-xl font-semibold text-purple-950">
          Appointment details
        </h2>
        <p className="mt-1 text-sm text-purple-700/70">
          Choose a preferred date and time for your {service.serviceName}{" "}
          appointment.
        </p>

        <div className="mt-6">
          <BookingForm
            serviceId={service._id}
            serviceName={service.serviceName}
            hourlyRate={service.price}
            apiUrl={API_URL}
            userId={session?.user?.id ?? null}
            userName={session?.user?.name ?? null}
            userEmail={session?.user?.email ?? null}
            minDate={minDate}
          />
        </div>
      </section>
    </main>
  );
}
