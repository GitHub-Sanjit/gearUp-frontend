import { UserCircle } from "lucide-react";

import type { User } from "@/types/user";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const profileImage = user.profile?.profilePhoto;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
          {profileImage ? (
            <img
              src={profileImage}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserCircle className="h-14 w-14 text-muted-foreground" />
          )}
        </div>

        {/* User Information */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>

          <p className="text-muted-foreground">{user.email}</p>

          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}
