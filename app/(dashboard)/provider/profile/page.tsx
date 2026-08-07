"use client";

import ProfileHeader from "@/components/provider/profile/ProfileHeader";
import ProfileInformation from "@/components/provider/profile/ProfileInformation";
import ProfileSkeleton from "@/components/provider/profile/ProfileSkeleton";

import { useAuth } from "@/hooks/useAuth";

export default function ProviderProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 lg:p-10">
        <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-semibold">Profile not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please login again to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-10">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your provider account information.
        </p>
      </div>

      <ProfileHeader user={user} />

      <ProfileInformation user={user} />
    </div>
  );
}
