import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import ServiceCard, { type Service } from "@/components/services/service-card";

export default function FeaturedServices({
  services,
}: {
  services: Service[];
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium text-purple-700">
            <Sparkles className="size-3.5" />
            Popular right now
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Featured Salon Services
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            A few favourites our clients keep coming back for.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 transition hover:text-purple-950"
        >
          View all services
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}
