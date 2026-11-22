import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AuthField from "@/components/auth/AuthField";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <AuthShell
      badge="Welcome back"
      title="Sign in to your account"
      description="Pick up where you left off and manage your upcoming salon visits."
      footer={
        <>
          New to SalonBook?{" "}
          <Link
            href="/signup"
            className="font-semibold text-purple-700 underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form aria-label="Sign in" className="space-y-5">
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          labelTrailing={
            <button
              type="button"
              className="text-xs font-medium text-purple-700 underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          }
        />

        <label className="flex items-center gap-2.5 text-sm text-purple-700">
          <input
            type="checkbox"
            className="size-4 shrink-0 accent-purple-700"
          />
          Remember me for 30 days
        </label>

        <Button
          type="button"
          size="lg"
          className="h-11 w-full rounded-full bg-purple-900 text-white hover:bg-purple-800"
        >
          Sign in
          <ArrowRight className="size-4" />
        </Button>

        <div className="relative py-1 text-center text-xs text-purple-500">
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px bg-purple-100"
          />
          <span className="relative bg-white px-3">or continue with</span>
        </div>

        <GoogleButton />
      </form>
    </AuthShell>
  );
}
