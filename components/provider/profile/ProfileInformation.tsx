import { Mail, User, ShieldCheck, FileText, CalendarDays } from "lucide-react";

import type { User as UserType } from "@/types/user";

interface ProfileInformationProps {
  user: UserType;
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your account details and personal information
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Name */}
        <div className="flex gap-3">
          <User className="mt-1 h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p className="font-medium">{user.name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3">
          <Mail className="mt-1 h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        {/* Role */}
        <div className="flex gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">Account Type</p>

            <p className="font-medium">{user.role}</p>
          </div>
        </div>

        {/* Profile Bio */}
        <div className="flex gap-3 md:col-span-2">
          <FileText className="mt-1 h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">Bio</p>

            <p className="font-medium">
              {user.profile?.bio || "No bio added yet."}
            </p>
          </div>
        </div>

        {/* Created Date */}
        {user.createdAt && (
          <div className="flex gap-3">
            <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">Joined</p>

              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
