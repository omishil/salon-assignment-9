import type { ProfileUser } from "@/components/dashboard/shared/profile-panel";
import { auth } from "@/lib/auth";

type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

export function toProfileUser(session: AuthSession): ProfileUser | null {
  if (!session?.user) return null;

  const role = session.user.role ?? "customer";

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
    phone:
      (session.user as typeof session.user & { phone?: string | null }).phone ??
      null,
    role,
    createdAt:
      session.user.createdAt instanceof Date
        ? session.user.createdAt.toISOString()
        : typeof session.user.createdAt === "string"
          ? session.user.createdAt
          : null,
    emailVerified: session.user.emailVerified,
  };
}
