import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: string;
  createdAt: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-purple-50">
        <Image
          src={service.image}
          alt={service.serviceName}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-700 shadow-sm backdrop-blur">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-purple-950">
          {service.serviceName}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-purple-700/70">
          {service.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between gap-3 border-t border-purple-100 pt-4 text-sm">
            <span className="font-semibold text-purple-900">
              {service.price.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1.5 text-purple-600">
              <Clock3 className="size-4" />
              {service.duration} min
            </span>
          </div>

          <Link
            href={`/services/${service._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-900 transition hover:border-purple-900 hover:bg-purple-900 hover:text-white"
          >
            View Details
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
