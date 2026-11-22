import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AuthField from "@/components/auth/AuthField";
import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
  return (
    <AuthShell
      badge="Get started"
      title="Create your account"
      description="Join SalonBook and book your next appointment in just a few taps."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-purple-700 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form aria-label="Create an account" className="space-y-5">
        <AuthField
          id="full-name"
          label="Full name"
          placeholder="Your full name"
          autoComplete="name"
        />
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          autoComplete="tel"
          hint="Optional — we'll only use it for appointment updates."
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          hint="Use at least 8 characters."
        />
        <AuthField
          id="confirm-password"
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-purple-700/80">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-purple-700"
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-purple-800 underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-purple-800 underline underline-offset-2">
              Privacy Policy
            </span>
            .
          </span>
        </label>

        <Button
          type="button"
          size="lg"
          className="h-11 w-full rounded-full bg-purple-900 text-white hover:bg-purple-800"
        >
          Create account
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthShell>
  );
}
