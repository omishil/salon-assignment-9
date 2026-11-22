"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import AuthField from "@/components/auth/AuthField";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const rememberMe = formData.get("rememberMe") === "true";

    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Could not sign you in");
      return;
    }

    toast.success("Welcome back");
    router.push("/");
    router.refresh();
  }

  return (
    <form aria-label="Sign in" className="space-y-5" onSubmit={handleSignIn}>
      <AuthField
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        disabled={isSubmitting}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        disabled={isSubmitting}
        labelTrailing={
          <button
            type="button"
            className="text-xs font-medium text-purple-700 underline-offset-4 hover:underline"
            disabled={isSubmitting}
          >
            Forgot password?
          </button>
        }
      />

      <label className="flex items-center gap-2.5 text-sm text-purple-700">
        <input
          type="checkbox"
          name="rememberMe"
          value="true"
          defaultChecked
          className="size-4 shrink-0 accent-purple-700"
          disabled={isSubmitting}
        />
        Remember me for 30 days
      </label>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full rounded-full bg-purple-900 text-white hover:bg-purple-800"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
        {!isSubmitting ? <ArrowRight className="size-4" /> : null}
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
  );
}
