"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Image as ImageIcon,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  role: string;
  createdAt: string | null;
  emailVerified: boolean;
};

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-purple-200 bg-[#fdfbff] px-3.5 text-sm text-purple-950 outline-none transition placeholder:text-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60";

function ProfileAvatar({
  image,
  name,
  className = "size-24",
}: {
  image: string | null;
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
        className={`${className} rounded-full bg-purple-100 object-cover ring-4 ring-white shadow-sm`}
      />
    );
  }

  return (
    <span
      className={`${className} grid place-items-center rounded-full bg-purple-900 text-2xl font-semibold text-white ring-4 ring-white shadow-sm`}
    >
      {initials || "?"}
    </span>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white text-purple-600 shadow-sm">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-medium text-purple-950">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ProfilePanel({ user }: { user: ProfileUser | null }) {
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [image, setImage] = useState(user?.image ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  if (!user) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center shadow-sm">
        <UserRound className="mx-auto size-10 text-purple-400" />
        <h2 className="mt-4 font-display text-xl font-semibold text-purple-950">
          Sign in to manage your profile
        </h2>
        <p className="mt-2 text-sm text-purple-700/70">
          Your profile details are tied to your salon account.
        </p>
        <Button asChild className="mt-6 rounded-full bg-purple-900 text-white">
          <Link href="/signin">Sign in</Link>
        </Button>
      </div>
    );
  }

  function handleReset() {
    setName(user!.name);
    setPhone(user!.phone ?? "");
    setImage(user!.image ?? "");
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedImage = image.trim();
    const trimmedPhone = phone.trim();

    if (trimmedName.length < 2) {
      const message = "Name must be at least 2 characters.";
      setError(message);
      toast.error(message);
      return;
    }

    if (
      trimmedImage &&
      !/^https?:\/\//i.test(trimmedImage)
    ) {
      const message = "Enter a valid image URL or upload an image file.";
      setError(message);
      toast.error(message);
      return;
    }

    if (trimmedPhone && !/^[+\d][\d\s().-]{4,}$/.test(trimmedPhone)) {
      const message = "Enter a valid phone number or leave it blank.";
      setError(message);
      toast.error(message);
      return;
    }

    setIsSaving(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
        phone: trimmedPhone,
      });

      if (updateError) {
        const message =
          updateError.message ?? "Could not update your profile.";
        setError(message);
        toast.error(message);
        return;
      }

      setName(trimmedName);
      setPhone(trimmedPhone);
      setImage(trimmedImage);
      setSuccess("Profile updated successfully.");
      toast.success("Profile updated successfully.");
      router.refresh();
    } catch {
      const message = "Could not reach the salon server. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-purple-950">
            Profile Management
          </h2>
          <p className="mt-1 text-sm text-purple-700/70">
            View your details and edit the information customers see.
          </p>
        </div>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold capitalize text-purple-700">
          {user.role} account
        </span>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="flex flex-col items-center gap-5 rounded-2xl bg-purple-50/60 p-5 text-center">
          <ProfileAvatar image={image || user.image} name={name || user.name} />

          <div className="min-w-0">
            <p className="font-display text-xl font-semibold text-purple-950">
              {user.name}
            </p>
            <p className="mt-1 break-all text-xs text-purple-500">
              {user.email}
            </p>
          </div>

          <div className="w-full space-y-4 border-t border-purple-200/70 pt-5 text-left">
            <DetailRow icon={Mail} label="Email" value={user.email} />
            <DetailRow
              icon={Phone}
              label="Phone"
              value={user.phone || "Not added"}
            />
            <DetailRow
              icon={ShieldCheck}
              label="Account type"
              value={user.role}
            />
            <DetailRow
              icon={CalendarDays}
              label="Member since"
              value={memberSince}
            />
            <DetailRow
              icon={CheckCircle2}
              label="Email verified"
              value={user.emailVerified ? "Verified" : "Not verified"}
            />
          </div>

          <p className="text-[11px] leading-relaxed text-purple-400">
            Role and account status are managed by the salon and cannot be
            changed here.
          </p>
        </aside>

        <form
          className="space-y-5 rounded-2xl border border-purple-200 bg-purple-100/50 p-5 shadow-inner shadow-purple-900/5"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="border-b border-purple-200/80 pb-4">
            <h3 className="font-display text-lg font-semibold text-purple-950">
              Edit profile
            </h3>
            <p className="mt-1 text-xs text-purple-700/70">
              Update the details shown on your account.
            </p>
          </div>

          <div>
            <label htmlFor="profile-name" className="text-sm font-medium text-purple-950">
              Full name
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSaving}
              className={inputClassName}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="profile-phone" className="text-sm font-medium text-purple-950">
              Phone number
            </label>
            <input
              id="profile-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={isSaving}
              className={inputClassName}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="rounded-xl border border-purple-200 bg-[#fdfbff] p-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-purple-600" />
              <p className="text-sm font-medium text-purple-950">
                Profile image
              </p>
            </div>

            <label
              htmlFor="profile-image-url"
              className="mt-4 block text-xs font-medium text-purple-700"
            >
              Image URL
            </label>
            <input
              id="profile-image-url"
              name="imageUrl"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              disabled={isSaving}
              className={inputClassName}
              placeholder="https://example.com/photo.jpg"
            />
            <p className="mt-2 text-xs text-purple-400">
              Paste a public image URL. Leave blank to remove your photo.
            </p>
          </div>

          {error ? (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              {error}
            </div>
          ) : null}

          {success ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-700"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              {success}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 border-t border-purple-200/80 pt-5">
            <Button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-purple-900 px-6 text-white hover:bg-purple-800"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={handleReset}
              disabled={isSaving}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
