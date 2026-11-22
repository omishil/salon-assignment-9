import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Scissors, Sparkles } from "lucide-react";

const perks = [
  "Trusted, top-rated stylists",
  "Real-time appointment availability",
  "Book your visit in under a minute",
];

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

export default function AuthShell({
  badge,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="flex flex-1 bg-[#faf8fe]">
      <aside className="relative hidden w-[44%] shrink-0 overflow-hidden bg-purple-950 text-white lg:block">
        <Image
          src="https://images.pexels.com/photos/7750115/pexels-photo-7750115.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt=""
          fill
          priority
          sizes="44vw"
          quality={85}
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-purple-950/85 via-purple-950/75 to-purple-950/95" />
        <div
          aria-hidden
          className="absolute -left-24 top-1/4 size-80 rounded-full bg-purple-500/20 blur-3xl"
        />

        <div className="relative flex h-full min-h-[720px] flex-col justify-between p-10 xl:p-14">
          <Link href="/" className="inline-flex w-fit items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Scissors className="size-[18px]" strokeWidth={2.2} />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Salon<span className="text-purple-300">Book</span>
            </span>
          </Link>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-purple-100 backdrop-blur">
              <Sparkles className="size-3.5" />
              Beauty, simplified
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight xl:text-5xl">
              Your next great look
              <span className="block text-purple-300">starts here.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-purple-100/75 xl:text-base">
              Join SalonBook to discover trusted stylists, explore curated
              services, and keep every appointment in one place.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-purple-50/90">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-purple-400/25 text-purple-200">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <blockquote className="text-sm italic leading-relaxed text-white/90">
              “Booking my appointment took less than a minute. I found the
              perfect stylist for my hair type.”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-purple-300 text-sm font-semibold text-purple-950">
                AM
              </span>
              <span>
                <span className="block text-sm font-medium">Amara M.</span>
                <span className="block text-xs text-purple-200/70">
                  SalonBook member
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </aside>

      <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="w-full max-w-[27rem]">
          <div className="rounded-[1.75rem] border border-purple-100 bg-white p-6 shadow-[0_24px_70px_-35px_rgba(70,34,90,0.35)] sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-purple-700">
              <Sparkles className="size-3.5" />
              {badge}
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-purple-950 sm:text-[2.15rem]">
              {title}
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-purple-700/70">
              {description}
            </p>

            <div className="mt-8">{children}</div>

            <div className="mt-7 border-t border-purple-100 pt-6 text-center text-sm text-purple-700/75">
              {footer}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-purple-500/70">
            © {new Date().getFullYear()} SalonBook. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
