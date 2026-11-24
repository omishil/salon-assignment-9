"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import AuthField from "@/components/auth/AuthField";
import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirm-password") ?? "");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
      phone: phone || undefined,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Account created successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <form
      aria-label="Create an account"
      className="space-y-5"
      onSubmit={handleSignUp}
    >
      <AuthField
        id="name"
        label="Full name"
        placeholder="Your full name"
        autoComplete="name"
        required
        disabled={isSubmitting}
      />
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
        id="phone"
        label="Phone number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        autoComplete="tel"
        hint="Optional — we'll only use it for appointment updates."
        disabled={isSubmitting}
      />
      <AuthField
        id="image"
        label="Image URL"
        type="url"
        placeholder="https://example.com/profile.jpg"
        autoComplete="url"
        hint="Optional — add a photo so your stylist can recognize you."
        disabled={isSubmitting}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        placeholder="Create a password"
        autoComplete="new-password"
        hint="Use at least 8 characters."
        required
        minLength={8}
        maxLength={128}
        disabled={isSubmitting}
      />
      <AuthField
        id="confirm-password"
        label="Confirm password"
        type="password"
        placeholder="Re-enter your password"
        autoComplete="new-password"
        required
        minLength={8}
        maxLength={128}
        disabled={isSubmitting}
      />

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-purple-700/80">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-purple-700"
          disabled={isSubmitting}
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
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full rounded-full bg-purple-900 text-white hover:bg-purple-800"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
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
