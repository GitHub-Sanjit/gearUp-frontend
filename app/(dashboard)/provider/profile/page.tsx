"use client";

import { useState } from "react";

import ProfileHeader from "@/components/provider/profile/ProfileHeader";
import ProfileInformation from "@/components/provider/profile/ProfileInformation";
import ProfileForm from "@/components/provider/profile/ProfileForm";
import ProfileSkeleton from "@/components/provider/profile/ProfileSkeleton";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";

export default function ProviderProfilePage() {
  const { user, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border bg-background p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold">Profile not found</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Please login again to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your provider account information.
        </p>
      </div>

      {/* Profile Header */}

      <div className="rounded-xl border bg-background shadow-sm">
        <ProfileHeader user={user} onEdit={() => setIsEditing(true)} />
      </div>

      {/* Profile Content */}

      {isEditing ? (
        <div className="space-y-4">
          <ProfileForm user={user} onSuccess={() => setIsEditing(false)} />

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={false}
            >
              Cancel Editing
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border bg-background shadow-sm">
          <ProfileInformation user={user} />
        </div>
      )}
    </div>
  );
}
