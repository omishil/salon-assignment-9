import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  LayoutGrid,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  {
    title: "Curated services",
    description:
      "Explore a focused collection of salon treatments, all in one place.",
    icon: Sparkles,
  },
  {
    title: "Clear details",
    description:
      "See the price, duration, and description before you make a choice.",
    icon: BadgeCheck,
  },
  {
    title: "Easy browsing",
    description:
      "Filter by category or jump straight to the treatments you love.",
    icon: LayoutGrid,
  },
  {
    title: "Booking-ready",
    description:
      "Move from service details to appointment booking in just a few clicks.",
    icon: CalendarCheck2,
  },
];

export default function WhySalonBook({
  serviceCount,
  categoryCount,
}: {
  serviceCount: number;
  categoryCount: number;
}) {
  return (
    <section className="border-t border-purple-100 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-medium text-purple-700">
            <Sparkles className="size-3.5" />
            The SalonBook experience
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Why SalonBook?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            A better way to discover your next salon service, with the details
            you need before you book.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5 transition hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-lg hover:shadow-purple-900/5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-purple-900 text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-purple-950">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-purple-700/70">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl border border-purple-100 bg-purple-50/60 p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <p className="font-display text-3xl font-semibold text-purple-950">
              {serviceCount}+
            </p>
            <p className="mt-1 text-sm text-purple-700/70">Services to explore</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-purple-950">
              {categoryCount}
            </p>
            <p className="mt-1 text-sm text-purple-700/70">Salon categories</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-purple-950">
              100%
            </p>
            <p className="mt-1 text-sm text-purple-700/70">Salon-focused</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-purple-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
          >
            Browse all services
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
