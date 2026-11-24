import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { ADMIN_DASHBOARD, CUSTOMER_DASHBOARD } from "@/lib/routes";

type SearchParams = {
  view?: string | string[];
  booked?: string | string[];
};

function appendQuery(
  params: URLSearchParams,
  key: string,
  value?: string | string[],
) {
  if (Array.isArray(value)) {
    value.forEach((item) => params.append(key, item));
  } else if (value) {
    params.set(key, value);
  }
}

export default async function DashboardRedirect({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const requestHeaders = await headers();
  const [{ view, booked }, session] = await Promise.all([
    searchParams,
    auth.api.getSession({ headers: requestHeaders }),
  ]);

  const params = new URLSearchParams();
  appendQuery(params, "view", view);
  appendQuery(params, "booked", booked);

  const query = params.toString();
  const role = session?.user?.role;
  const destination = role === "admin" ? ADMIN_DASHBOARD : CUSTOMER_DASHBOARD;

  redirect(`${destination}${query ? `?${query}` : ""}`);
}
