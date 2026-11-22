"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import ServiceCard, { type Service } from "@/components/services/service-card";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "name-asc";

export default function ServicesExplorer({
  services,
}: {
  services: Service[];
}) {
  const [sort, setSort] = useState<SortOption>("default");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((service) => service.category)))],
    [services],
  );

  const visibleServices = useMemo(() => {
    const result = services.filter(
      (service) => category === "All" || service.category === category,
    );

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration-asc":
        result.sort((a, b) => a.duration - b.duration);
        break;
      case "name-asc":
        result.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
        break;
      default:
        break;
    }

    return result;
  }, [services, category, sort]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-purple-400" />
            <input
              type="search"
              aria-label="Search services"
              placeholder="Search services..."
              className="h-12 w-full rounded-xl border border-purple-100 bg-purple-50/50 pl-11 pr-4 text-sm text-purple-950 outline-none transition placeholder:text-purple-400 focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-purple-400" />
            <select
              id="sort-services"
              aria-label="Sort services"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-12 w-full appearance-none rounded-xl border border-purple-100 bg-purple-50/50 pl-11 pr-10 text-sm font-medium text-purple-900 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 lg:w-56"
            >
              <option value="default">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration-asc">Duration: Shortest</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-purple-400" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-purple-50 pt-4 sm:flex-row sm:items-center">
          <span className="flex shrink-0 items-center gap-2 rounded-full bg-purple-50 py-1 pl-1 pr-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-purple-800">
            <span className="grid size-6 place-items-center rounded-full bg-purple-900 text-white">
              <SlidersHorizontal className="size-3" />
            </span>
            Category
          </span>
          <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? "shrink-0 rounded-full bg-purple-900 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-purple-900/20"
                    : "shrink-0 rounded-full border border-purple-100 bg-purple-50/40 px-4 py-2 text-xs font-medium text-purple-700 transition hover:border-purple-300 hover:bg-purple-50"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-purple-500">
          Showing{" "}
          <span className="font-semibold text-purple-900">
            {visibleServices.length}
          </span>{" "}
          of {services.length} services
        </p>
        {category !== "All" || sort !== "default" ? (
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setSort("default");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 transition hover:text-purple-900"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        ) : null}
      </div>

      {visibleServices.length === 0 ? (
        <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-10 text-center text-purple-700">
          No services found in this category.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
