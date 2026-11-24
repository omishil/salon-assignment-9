"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Scissors,
} from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { ADMIN_DASHBOARD, CUSTOMER_DASHBOARD } from "@/lib/routes";
import { cn } from "@/lib/utils";

const baseNavLinks = [
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

function UserAvatar({
  image,
  name,
  className,
}: {
  image?: string | null;
  name: string;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image && !imageFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        onError={() => setImageFailed(true)}
        className={cn(
          "size-8 rounded-full bg-purple-800 object-cover ring-2 ring-white/20",
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "grid size-8 place-items-center rounded-full bg-purple-800 text-xs font-semibold text-white ring-2 ring-white/20",
        className,
      )}
    >
      {initials || "?"}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const dashboardHref =
    user?.role === "admin" ? ADMIN_DASHBOARD : CUSTOMER_DASHBOARD;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  async function handleLogout() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Could not sign you out");
      return;
    }

    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-purple-950/95 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {baseNavLinks.map((link) => (
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
          {isPending ? (
            <span className="size-8 animate-pulse rounded-full bg-white/10" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <UserAvatar image={user.image} name={user.name} />
                  <span className="max-w-32 truncate">{user.name}</span>
                  <ChevronDown className="size-4 text-white/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col gap-0.5">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref}>
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
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
              {baseNavLinks.map((link) => (
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

            <div className="mt-auto border-t p-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-md bg-muted" />
              ) : user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar
                      image={user.image}
                      name={user.name}
                      className="size-9"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-purple-950">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-purple-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Link
                      href={dashboardHref}
                      className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  </SheetClose>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
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
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
