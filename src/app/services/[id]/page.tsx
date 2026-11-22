import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Sparkles,
  Tag,
} from "lucide-react";

import type { Service } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Service Details",
};

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

const highlights = [
  "Professional consultation",
  "Premium products",
  "Relaxing, personalised experience",
];

export default async function ServiceDetailPage({
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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 transition hover:text-purple-900"
      >
        <ArrowLeft className="size-4" />
        Back to services
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-purple-100 bg-purple-50">
          <Image
            src={service.image}
            alt={service.serviceName}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-purple-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-950/25">
            <Tag className="size-3.5" />
            {service.category}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium text-purple-700">
            <Sparkles className="size-3.5" />
            Salon service
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-purple-950 sm:text-5xl">
            {service.serviceName}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-purple-700/70">
            {service.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-500">
                Category
              </p>
              <p className="mt-1 flex items-center gap-2 text-base font-semibold text-purple-900">
                <Tag className="size-4 shrink-0 text-purple-600" />
                {service.category}
              </p>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-400">
                Price
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-purple-950">
                {service.price.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-400">
                Estimated Duration
              </p>
              <p className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-purple-950">
                <Clock3 className="size-5 text-purple-500" />
                {service.duration} min
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
            <h2 className="text-sm font-semibold text-purple-950">
              What to expect
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-purple-700/80">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-purple-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-purple-600" />
              <h2 className="text-sm font-semibold text-purple-950">
                Appointment Booking
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-purple-700/70">
              Pick a date and time that works for you and we&apos;ll take care
              of the rest.
            </p>
            <Button
              size="lg"
              className="mt-4 h-12 w-full rounded-full bg-purple-900 text-white hover:bg-purple-800"
            >
              <CalendarDays className="size-4" />
              Book an Appointment
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
