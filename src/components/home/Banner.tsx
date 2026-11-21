import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = ["Expert stylists", "Easy online booking", "Premium products"];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-purple-900 text-white">
      <Image
        src="https://images.pexels.com/photos/4969835/pexels-photo-4969835.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-linear-to-r from-purple-950/90 via-purple-900/70 to-purple-950/15" />

      <div
        aria-hidden
        className="absolute -left-32 -top-32 size-96 rounded-full bg-purple-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-0 size-[28rem] rounded-full bg-purple-500/20 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-purple-100 backdrop-blur">
            <Sparkles className="size-3.5" />
            Premium salon experience
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Your beauty,
            <span className="block text-purple-300">booked in minutes.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-purple-100/80 sm:text-lg">
            Discover trusted stylists, explore curated salon services, and
            reserve your next appointment online — no calls, no waiting.
          </p>

          <div className="mt-8 flex flex-row flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 w-full rounded-full bg-white px-6 text-purple-950 hover:bg-purple-100 sm:w-auto"
            >
              <Link href="/services">
                Explore Salon Services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-purple-100/70">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-purple-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-purple-950/60">
            <Image
              src="https://images.pexels.com/photos/7750115/pexels-photo-7750115.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="A calm, modern salon interior with styling chairs and mirrors"
              fill
              sizes="(min-width: 1024px) 384px, 90vw"
              quality={85}
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-7 -left-7 hidden size-36 overflow-hidden rounded-2xl border-4 border-purple-950 shadow-xl sm:block">
            <Image
              src="https://images.pexels.com/photos/7750098/pexels-photo-7750098.jpeg?auto=compress&cs=tinysrgb&w=500"
              alt="Bright salon interior with styling stations"
              fill
              sizes="144px"
              quality={85}
              className="object-cover"
            />
          </div>

          <div className="absolute -top-5 -left-5 hidden rounded-2xl border border-white/15 bg-white/95 px-4 py-3 text-purple-950 shadow-xl backdrop-blur sm:block">
            <p className="text-xs font-medium uppercase tracking-wide text-purple-700">
              Open today
            </p>
            <p className="mt-0.5 text-sm font-semibold">9:00 AM – 8:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
