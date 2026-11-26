import { Suspense } from "react";
import { connection } from "next/server";

import Banner from "@/components/home/Banner";
import FeaturedServices from "@/components/home/featured-services";
import HomeSectionsSkeleton from "@/components/home/home-sections-skeleton";
import ServiceCategories from "@/components/home/service-categories";
import WhySalonBook from "@/components/home/why-salonbook";
import type { Service } from "@/components/services/service-card";

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

async function HomeSections() {
  await connection();

  let services: Service[] = [];

  try {
    const response = await fetch(`${API_URL}/services?status=Active`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as { data: Service[] };
    services = payload.data ?? [];
  } catch {
    return null;
  }

  if (services.length === 0) {
    return null;
  }

  const categoryCounts = services.reduce<Record<string, number>>(
    (counts, service) => {
      counts[service.category] = (counts[service.category] ?? 0) + 1;
      return counts;
    },
    {},
  );
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <>
      <FeaturedServices services={services.slice(0, 6)} />
      <ServiceCategories categories={categories} />
      <WhySalonBook
        serviceCount={services.length}
        categoryCount={categories.length}
      />
    </>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <Banner />
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections />
      </Suspense>
    </main>
  );
}
