import type { Metadata } from "next";
import Link from "next/link";

import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/sign-in-form";

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
      <SignInForm />
    </AuthShell>
  );
}
