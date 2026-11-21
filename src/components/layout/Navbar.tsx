"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu, Scissors } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
        <Scissors className="size-[18px]" strokeWidth={2.2} />
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight text-white">
        Salon<span className="text-purple-300">Book</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-purple-950/95 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-white text-purple-950"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-full text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-purple-950 hover:bg-purple-100"
          >
            <Link href="/signup">
              <CalendarDays className="size-4" />
              Sign Up
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="size-10 rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 bg-white">
            <SheetHeader className="border-b">
              <SheetTitle className="font-display text-xl">SalonBook</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-3">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-purple-700 hover:bg-muted hover:text-purple-950",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-2 gap-2 border-t p-4">
              <SheetClose asChild>
                <Link
                  href="/signin"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign In
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/signup" className={buttonVariants()}>
                  Sign Up
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
