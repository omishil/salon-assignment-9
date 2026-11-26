"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { ADMIN_DASHBOARD } from "@/lib/routes";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/lib/service-categories";

const API_URL = process.env.SALON_API_URL ?? "http://localhost:5000";

export type CreateServiceResult =
  | { success: true; message: string }
  | { success: false; message: string };

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function createService(
  formData: FormData,
): Promise<CreateServiceResult> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { success: false, message: "You must be signed in to add a service." };
  }

  if (session.user.role !== "admin") {
    return { success: false, message: "Only admins can add services." };
  }

  const serviceName = String(formData.get("serviceName") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const status = String(formData.get("status") ?? "Active");
  const priceValue = String(formData.get("price") ?? "");
  const durationValue = String(formData.get("duration") ?? "");
  const price = Number(priceValue);
  const duration = Number(durationValue);

  const errors: string[] = [];
  if (!serviceName) errors.push("Service name is required.");
  if (!(SERVICE_CATEGORIES as readonly string[]).includes(category)) {
    errors.push("Select a valid service category.");
  }
  if (!description) errors.push("Description is required.");
  if (!priceValue || !Number.isFinite(price) || price <= 0) {
    errors.push("Enter a valid price greater than 0.");
  }
  if (
    !durationValue ||
    !Number.isFinite(duration) ||
    duration <= 0 ||
    !Number.isInteger(duration)
  ) {
    errors.push("Enter a valid duration in whole minutes greater than 0.");
  }
  if (!isValidHttpUrl(image)) errors.push("Enter a valid http(s) image URL.");
  if (status !== "Active" && status !== "Inactive") {
    errors.push("Select a valid service status.");
  }

  if (errors.length > 0) {
    return { success: false, message: errors.join(" ") };
  }

  const service = {
    serviceName,
    category: category as ServiceCategory,
    description,
    price,
    duration,
    image,
    status,
  };

  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
      cache: "no-store",
    });

    const payload = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !payload.success) {
      return {
        success: false,
        message: payload.message ?? "Failed to add service.",
      };
    }

    revalidatePath(ADMIN_DASHBOARD);
    revalidatePath("/services");

    return { success: true, message: "Service added successfully." };
  } catch {
    return {
      success: false,
      message: "Could not reach the salon service API. Please try again.",
    };
  }
}
