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
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-[11px] font-medium text-purple-700 sm:px-3.5 sm:text-xs">
            <Sparkles className="size-3 sm:size-3.5" />
            The SalonBook experience
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Why SalonBook?
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-purple-700/70 sm:text-sm">
            A better way to discover your next salon service, with the details
            you need before you book.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-purple-100 bg-purple-50/40 p-3 transition hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-lg hover:shadow-purple-900/5 sm:rounded-2xl sm:p-5"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-purple-900 text-white sm:size-10 sm:rounded-xl">
                  <Icon className="size-4 sm:size-5" />
                </span>
                <h3 className="mt-3 text-xs font-semibold text-purple-950 sm:mt-4 sm:text-sm">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-purple-700/70 sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-purple-100 bg-purple-50/60 p-4 sm:mt-10 sm:grid-cols-3 sm:gap-6 sm:rounded-3xl sm:p-8">
          <div>
            <p className="font-display text-2xl font-semibold text-purple-950 sm:text-3xl">
              {serviceCount}+
            </p>
            <p className="mt-1 text-xs text-purple-700/70 sm:text-sm">
              Services to explore
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-purple-950 sm:text-3xl">
              {categoryCount}
            </p>
            <p className="mt-1 text-xs text-purple-700/70 sm:text-sm">
              Salon categories
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-purple-950 sm:text-3xl">
              100%
            </p>
            <p className="mt-1 text-xs text-purple-700/70 sm:text-sm">
              Salon-focused
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-purple-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-800 sm:px-6 sm:py-3 sm:text-sm"
          >
            Browse all services
            <ArrowRight className="size-3.5 sm:size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
