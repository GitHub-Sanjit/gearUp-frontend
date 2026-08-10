import { CalendarDays, ShieldCheck, User, UserRoundCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { User as UserType } from "@/types/user";

interface AccountInformationProps {
  user: UserType;
}

export default function AccountInformation({ user }: AccountInformationProps) {
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>

        <CardDescription>
          Your account details and system information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Role */}

          <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Role</p>

              <Badge className="mt-1">{user.role}</Badge>
            </div>
          </div>

          {/* Status */}

          <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
              <UserRoundCheck className="h-5 w-5 text-green-600" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Status</p>

              <Badge className="mt-1 bg-green-600 hover:bg-green-600">
                ACTIVE
              </Badge>
            </div>
          </div>

          {/* Member Since */}

          <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Member Since</p>

              <p className="mt-1 font-medium">{memberSince}</p>
            </div>
          </div>

          {/* User ID */}

          <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">User ID</p>

              <p
                className="mt-1 truncate font-mono text-sm font-medium"
                title={user.id}
              >
                {user.id}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
