"use client";

import Image from "next/image";
import Link from "next/link";
import { EllipsisVertical, Plus } from "lucide-react";

import DeleteServiceDialog from "@/components/dashboard/admin/delete-service-dialog";
import type { Service } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_DASHBOARD } from "@/lib/routes";

function formatStatus(status: string | undefined) {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClasses(status: string | undefined) {
  const normalized = status?.toLowerCase();
  if (normalized === "active") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }
  if (normalized === "inactive") {
    return "bg-gray-100 text-gray-600 ring-gray-200";
  }
  return "bg-purple-50 text-purple-700 ring-purple-200";
}

export default function ManageServices({ services }: { services: Service[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-purple-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-purple-950">
            Manage Services
          </h2>
          <p className="mt-1 text-sm text-purple-700/70">
            View and manage salon services.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href={`${ADMIN_DASHBOARD}?view=add-service`}>
            <Plus className="size-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-purple-50/60 text-[10px] font-semibold uppercase tracking-wide text-purple-400 sm:text-[11px]">
            <tr>
              <th className="px-4 py-3 sm:px-5">Service</th>
              <th className="hidden px-5 py-3 md:table-cell">Category</th>
              <th className="hidden px-5 py-3 sm:table-cell">Price</th>
              <th className="hidden px-5 py-3 lg:table-cell">Duration</th>
              <th className="hidden px-5 py-3 sm:table-cell">Status</th>
              <th className="px-4 py-3 text-right sm:px-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50">
            {services.length ? (
              services.map((service) => (
                <tr key={service._id} className="align-top text-purple-800">
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-purple-50 ring-1 ring-purple-100">
                        <Image
                          src={service.image}
                          alt={service.serviceName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-purple-950 sm:text-sm">
                          {service.serviceName}
                        </p>
                        <div className="mt-1 space-y-0.5 text-[11px] text-purple-500 sm:hidden">
                          <p>{service.category}</p>
                          <p>
                            {service.price.toLocaleString()} · {service.duration} min
                          </p>
                        </div>
                        <div className="mt-1.5 sm:hidden">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${statusClasses(service.status)}`}
                          >
                            {formatStatus(service.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-purple-700/80 md:table-cell">
                    {service.category}
                  </td>
                  <td className="hidden px-5 py-4 font-medium text-purple-950 sm:table-cell">
                    {service.price.toLocaleString()}
                  </td>
                  <td className="hidden px-5 py-4 text-purple-700/80 lg:table-cell">
                    {service.duration} min
                  </td>
                  <td className="hidden px-5 py-4 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusClasses(service.status)}`}
                    >
                      {formatStatus(service.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-5">
                    <div className="flex items-center justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5"
                            aria-label={`Change status for ${service.serviceName}`}
                          >
                            <EllipsisVertical className="size-4" />
                            <span className="hidden sm:inline">Status</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem disabled>Activate</DropdownMenuItem>
                          <DropdownMenuItem disabled>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DeleteServiceDialog service={service} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-purple-700/70"
                >
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
