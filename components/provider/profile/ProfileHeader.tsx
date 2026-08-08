/* eslint-disable @next/next/no-img-element */

"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ShieldCheck, CalendarDays, Package, ShoppingCart } from "lucide-react";

import type { User } from "@/types/user";

interface ProfileHeaderProps {
  user: User;
  onEdit: () => void;
}

export default function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  const profileImage = user.profile?.profilePhoto;

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const memberSince = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "--";

  return (
    <div className="px-6 pb-8 pt-6 sm:px-8">
      {/* Main Profile Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* Left Section */}

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
          {/* Avatar */}

          <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted text-3xl font-bold shadow-lg">
            {profileImage ? (
              <img
                src={profileImage}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          {/* User Information */}

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>

              <Badge className="gap-1 bg-green-600 hover:bg-green-600">
                <ShieldCheck className="h-3.5 w-3.5" />

                {user.role}
              </Badge>
            </div>

            <p className="text-muted-foreground">{user.email}</p>

            <p className="max-w-xl text-sm text-muted-foreground">
              Manage your equipment, rental requests, and provider account from
              one place.
            </p>
          </div>
        </div>

        {/* Edit Button */}

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Edit Profile
        </button>
      </div>

      <Separator className="my-8" />

      {/* Profile Stats */}

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Equipment */}

        <div className="rounded-xl border bg-muted/30 p-5 transition hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />

            <span className="text-sm">Equipment</span>
          </div>

          <h3 className="text-3xl font-bold">--</h3>

          <p className="mt-1 text-xs text-muted-foreground">Total equipment</p>
        </div>

        {/* Rentals */}

        <div className="rounded-xl border bg-muted/30 p-5 transition hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />

            <span className="text-sm">Rentals</span>
          </div>

          <h3 className="text-3xl font-bold">--</h3>

          <p className="mt-1 text-xs text-muted-foreground">Rental requests</p>
        </div>

        {/* Member Since */}

        <div className="rounded-xl border bg-muted/30 p-5 transition hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            <span className="text-sm">Member</span>
          </div>

          <h3 className="text-3xl font-bold">{memberSince}</h3>

          <p className="mt-1 text-xs text-muted-foreground">Joined GearUp</p>
        </div>
      </div>
    </div>
  );
}
