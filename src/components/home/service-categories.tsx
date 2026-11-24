import Link from "next/link";
import {
  ArrowUpRight,
  Brush,
  Flower2,
  Hand,
  Palette,
  Scissors,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type CategorySummary = {
  name: string;
  count: number;
};

type CategoryStyle = {
  icon: LucideIcon;
  gradient: string;
  description: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  "Haircut & Styling": {
    icon: Scissors,
    gradient: "from-purple-500 to-fuchsia-500",
    description: "Fresh cuts, blowouts, and everyday shape.",
  },
  "Hair Coloring": {
    icon: Palette,
    gradient: "from-fuchsia-500 to-pink-500",
    description: "Rich colour, highlights, and tonal refreshes.",
  },
  "Hair Treatment": {
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600",
    description: "Repair, hydration, and shine-boosting care.",
  },
  "Facial & Skincare": {
    icon: Smile,
    gradient: "from-rose-400 to-pink-500",
    description: "Cleanse, glow, and reset your skin.",
  },
  Makeup: {
    icon: Brush,
    gradient: "from-purple-500 to-indigo-500",
    description: "Soft glam and event-ready finishes.",
  },
  "Manicure & Pedicure": {
    icon: Hand,
    gradient: "from-pink-500 to-rose-500",
    description: "Polished nails and pampered hands and feet.",
  },
  "Spa & Massage": {
    icon: Flower2,
    gradient: "from-teal-400 to-emerald-500",
    description: "Unwind with calming treatments and massage.",
  },
};

const fallbackStyle: CategoryStyle = {
  icon: Scissors,
  gradient: "from-purple-500 to-purple-700",
  description: "Explore services in this category.",
};

export default function ServiceCategories({
  categories,
}: {
  categories: CategorySummary[];
}) {
  return (
    <section className="relative overflow-hidden border-t border-purple-900/40 bg-purple-950 text-white">
      <div className="pointer-events-none absolute -left-24 -top-20 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-purple-100 backdrop-blur">
              <Scissors className="size-3.5" />
              Browse by category
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Salon Service Categories
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
              From fresh cuts to full pampering, find the right treatment for
              your next salon day.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-100 transition hover:text-white"
          >
            See all services
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => {
            const style = categoryStyles[category.name] ?? fallbackStyle;
            const Icon = style.icon;

            return (
              <Link
                key={category.name}
                href={`/services?category=${encodeURIComponent(category.name)}`}
                className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl shadow-purple-950/20 backdrop-blur transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/15 sm:min-h-52 sm:p-5"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br ${style.gradient} opacity-25 blur-2xl transition group-hover:opacity-45`}
                />

                <div className="relative flex items-start justify-between gap-2 sm:gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${style.gradient} text-white shadow-lg sm:size-12`}
                  >
                    <Icon className="size-4 sm:size-5" />
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-semibold text-purple-100 backdrop-blur sm:px-2.5 sm:text-[11px]">
                    {category.count} {category.count === 1 ? "service" : "services"}
                  </span>
                </div>

                <div className="relative mt-6 sm:mt-8">
                  <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-purple-100/70 sm:text-xs">
                    {style.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-100 transition group-hover:text-white">
                    Explore category
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
