// app/unauthorized/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <h1 className="text-3xl font-bold">Access Denied</h1>

        <p className="mt-3 text-muted-foreground">
          You do not have permission to access this page. Please return to your
          dashboard.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>

          <Link href="/provider">
            <Button>Go Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
