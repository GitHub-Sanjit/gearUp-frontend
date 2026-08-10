"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CreditCard className="h-9 w-9 text-muted-foreground" />
          </div>

          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">Your payment was cancelled.</p>

            <p className="text-sm text-muted-foreground">
              Your rental has not been marked as paid. You can return to your
              rentals and try again whenever you&apos;re ready.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button>
              <Link href="/dashboard/rentals">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Rentals
              </Link>
            </Button>

            <Button variant="outline">
              <Link href="/gears">Browse Gear</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
