import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Sparkles } from "lucide-react";

import ServiceCard, { type Service } from "@/components/services/service-card";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the salon services available at SalonBook.",
};

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

type ServicesResponse = {
  success: boolean;
  count: number;
  data: Service[];
};

function Unavailable({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-10 text-center text-purple-700">
      {message}
    </div>
  );
}

async function ServiceGrid() {
  await connection();

  let services: Service[] = [];

  try {
    const response = await fetch(`${API_URL}/services`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as ServicesResponse;
    services = payload.data ?? [];
  } catch {
    return <Unavailable message="Services are unavailable right now. Please try again later." />;
  }

  if (services.length === 0) {
    return <Unavailable message="No services are available yet." />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-purple-700">
          <Sparkles className="size-3.5" />
          What we offer
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-purple-950 sm:text-5xl">
          Our services
        </h1>
        <p className="mt-4 text-base leading-relaxed text-purple-700/70">
          From a quick refresh to a full pampering session, find the treatment
          that fits your day.
        </p>
      </div>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 animate-pulse rounded-2xl bg-purple-50"
                />
              ))}
            </div>
          }
        >
          <ServiceGrid />
        </Suspense>
      </div>
    </main>
  );
}
