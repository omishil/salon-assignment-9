"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CheckCircle2, Link2 } from "lucide-react";
import { toast } from "sonner";

import { createService } from "@/app/dashboard/admin/actions";
import { Button } from "@/components/ui/button";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/lib/service-categories";

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-purple-200 bg-[#fdfbff] px-3.5 text-sm text-purple-950 outline-none transition placeholder:text-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60";

const textareaClassName =
  "mt-2 min-h-28 w-full rounded-xl border border-purple-200 bg-[#fdfbff] px-3.5 py-3 text-sm text-purple-950 outline-none transition placeholder:text-purple-300 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 disabled:cursor-not-allowed disabled:opacity-60";

type ServiceStatus = "Active" | "Inactive";

type CapturedServicePayload = {
  serviceName: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: ServiceStatus;
};

type FormErrors = Partial<
  Record<
    | "serviceName"
    | "category"
    | "description"
    | "price"
    | "duration"
    | "image"
    | "status",
    string
  >
>;

export default function AddServiceForm() {
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "">("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<ServiceStatus>("Active");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setServiceName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setDuration("");
    setStatus("Active");
    setImageUrl("");
    setErrors({});
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    setSuccess("");

    const trimmedName = String(formData.get("serviceName") ?? "").trim();
    const trimmedCategory = String(formData.get("category") ?? "").trim();
    const trimmedDescription = String(formData.get("description") ?? "").trim();
    const imageValue = String(formData.get("image") ?? "").trim();
    const statusValue = String(formData.get("status") ?? "") as ServiceStatus;
    const priceValue = String(formData.get("price") ?? "");
    const durationValue = String(formData.get("duration") ?? "");
    const parsedPrice = Number(priceValue);
    const parsedDuration = Number(durationValue);

    let isValidImageUrl = false;
    if (imageValue) {
      try {
        const url = new URL(imageValue);
        isValidImageUrl = url.protocol === "http:" || url.protocol === "https:";
      } catch {
        isValidImageUrl = false;
      }
    }

    const isValidCategory = (SERVICE_CATEGORIES as readonly string[]).includes(
      trimmedCategory,
    );

    const nextErrors: FormErrors = {};
    if (!trimmedName) nextErrors.serviceName = "Service name is required.";
    if (!trimmedCategory) nextErrors.category = "Service category is required.";
    else if (!isValidCategory)
      nextErrors.category = "Select a valid service category.";
    if (!trimmedDescription)
      nextErrors.description = "Description is required.";
    if (!priceValue || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      nextErrors.price = "Enter a valid price greater than 0.";
    }
    if (
      !durationValue ||
      !Number.isFinite(parsedDuration) ||
      parsedDuration <= 0 ||
      !Number.isInteger(parsedDuration)
    ) {
      nextErrors.duration =
        "Enter a valid duration in whole minutes greater than 0.";
    }
    if (!imageValue) nextErrors.image = "Image URL is required.";
    else if (!isValidImageUrl)
      nextErrors.image = "Enter a valid http(s) image URL.";
    if (statusValue !== "Active" && statusValue !== "Inactive") {
      nextErrors.status = "Service status is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const payload: CapturedServicePayload = {
      serviceName: trimmedName,
      category: trimmedCategory as ServiceCategory,
      description: trimmedDescription,
      price: parsedPrice,
      duration: parsedDuration,
      image: imageValue,
      status: statusValue,
    };

    console.log("Captured service form data:", payload);

    setIsSubmitting(true);
    try {
      const result = await createService(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      resetForm();
      setSuccess(result.message);
      toast.success("Service added successfully.");
    } catch {
      toast.error("Failed to add service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="border-b border-purple-100 px-5 py-4">
        <h2 className="font-display text-lg font-semibold text-purple-950">
          Add / Update Service
        </h2>
        <p className="mt-1 text-sm text-purple-700/70">
          Add a new salon service to the menu.
        </p>
      </div>

      <form className="space-y-5 p-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="service-name"
              className="text-sm font-medium text-purple-950"
            >
              Service Name
            </label>
            <input
              id="service-name"
              name="serviceName"
              type="text"
              value={serviceName}
              onChange={(event) => {
                setServiceName(event.target.value);
                setErrors((prev) => ({ ...prev, serviceName: undefined }));
              }}
              className={inputClassName}
              placeholder="e.g. Classic Haircut"
            />
            {errors.serviceName ? (
              <p className="mt-2 text-xs text-rose-600">{errors.serviceName}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="service-category"
              className="text-sm font-medium text-purple-950"
            >
              Service Category
            </label>
            <select
              id="service-category"
              name="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as ServiceCategory | "");
                setErrors((prev) => ({ ...prev, category: undefined }));
              }}
              className={inputClassName}
            >
              <option value="">Select a category</option>
              {SERVICE_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.category ? (
              <p className="mt-2 text-xs text-rose-600">{errors.category}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="service-description"
            className="text-sm font-medium text-purple-950"
          >
            Description
          </label>
          <textarea
            id="service-description"
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            className={textareaClassName}
            placeholder="Describe the service..."
          />
          {errors.description ? (
            <p className="mt-2 text-xs text-rose-600">{errors.description}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="service-price"
              className="text-sm font-medium text-purple-950"
            >
              Price
            </label>
            <input
              id="service-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setErrors((prev) => ({ ...prev, price: undefined }));
              }}
              className={inputClassName}
              placeholder="0.00"
            />
            {errors.price ? (
              <p className="mt-2 text-xs text-rose-600">{errors.price}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="service-duration"
              className="text-sm font-medium text-purple-950"
            >
              Estimated Duration (minutes)
            </label>
            <input
              id="service-duration"
              name="duration"
              type="number"
              min="1"
              step="1"
              value={duration}
              onChange={(event) => {
                setDuration(event.target.value);
                setErrors((prev) => ({ ...prev, duration: undefined }));
              }}
              className={inputClassName}
              placeholder="e.g. 45"
            />
            {errors.duration ? (
              <p className="mt-2 text-xs text-rose-600">{errors.duration}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="service-status"
              className="text-sm font-medium text-purple-950"
            >
              Service Status
            </label>
            <select
              id="service-status"
              name="status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as ServiceStatus);
                setErrors((prev) => ({ ...prev, status: undefined }));
              }}
              className={inputClassName}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status ? (
              <p className="mt-2 text-xs text-rose-600">{errors.status}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="service-image"
            className="flex items-center gap-2 text-sm font-medium text-purple-950"
          >
            <Link2 className="size-4 text-purple-600" />
            Image URL
          </label>
          <input
            id="service-image"
            name="image"
            type="url"
            value={imageUrl}
            onChange={(event) => {
              setImageUrl(event.target.value);
              setErrors((prev) => ({ ...prev, image: undefined }));
            }}
            className={inputClassName}
            placeholder="https://example.com/service-image.jpg"
          />
          <p className="mt-1.5 text-xs text-purple-500">
            Enter a public http(s) image URL for the service card.
          </p>
          {errors.image ? (
            <p className="mt-2 text-xs text-rose-600">{errors.image}</p>
          ) : null}
        </div>

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

        {Object.keys(errors).length > 0 && !success ? (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700"
          >
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            Please review the form fields and try again.
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2 border-t border-purple-100 pt-5">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-purple-900 px-6 text-white hover:bg-purple-800"
          >
            {isSubmitting ? "Adding Service..." : "Add Service"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
