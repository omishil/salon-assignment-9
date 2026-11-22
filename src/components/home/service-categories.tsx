import Link from "next/link";
import { ArrowUpRight, Scissors } from "lucide-react";

export default function ServiceCategories({
  categories,
}: {
  categories: string[];
}) {
  return (
    <section className="border-t border-purple-100 bg-purple-50/50">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-3.5 py-1.5 text-xs font-medium text-purple-700">
            <Scissors className="size-3.5" />
            Browse by category
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-4xl">
            Salon Service Categories
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-purple-700/70">
            Explore our treatments and find the one that fits your day.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/services?category=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/5"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-700">
                  <Scissors className="size-4" />
                </span>
                <span className="text-sm font-semibold leading-snug text-purple-950">
                  {category}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-purple-400 transition group-hover:text-purple-900" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
