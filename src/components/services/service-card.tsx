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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10 sm:rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-purple-50">
        <Image
          src={service.image}
          alt={service.serviceName}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-purple-900/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow-md shadow-purple-950/20 backdrop-blur sm:left-3 sm:top-3 sm:max-w-none sm:px-3 sm:py-1.5 sm:text-[11px]">
          {service.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-sm font-semibold leading-snug text-purple-950 sm:text-lg">
          {service.serviceName}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-purple-700/70 sm:mt-2 sm:text-sm sm:line-clamp-none">
          {service.description}
        </p>

        <div className="mt-auto space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-1.5 border-t border-purple-100 pt-3 text-xs sm:gap-3 sm:pt-4 sm:text-sm">
            <span className="font-semibold text-purple-900">
              {service.price.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 text-purple-600 sm:gap-1.5">
              <Clock3 className="size-3 sm:size-4" />
              {service.duration} min
            </span>
          </div>

          <Link
            href={`/services/${service._id}`}
            className="flex w-full items-center justify-center gap-1 rounded-full border border-purple-200 bg-white px-2 py-2 text-[11px] font-semibold text-purple-900 transition hover:border-purple-900 hover:bg-purple-900 hover:text-white sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            View Details
            <ArrowRight className="size-3 sm:size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
