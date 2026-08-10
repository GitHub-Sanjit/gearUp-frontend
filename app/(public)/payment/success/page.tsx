"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // The Stripe webhook updates the payment on the backend.
    // Refresh the relevant frontend data when the customer returns.
    queryClient.invalidateQueries({
      queryKey: ["my-rentals"],
    });

    queryClient.invalidateQueries({
      queryKey: ["my-payments"],
    });
  }, [queryClient]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>

          <CardTitle className="text-2xl">Payment Successful</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Your payment has been submitted successfully.
            </p>

            <p className="text-sm text-muted-foreground">
              Your rental will be updated once the payment is confirmed.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button>
              <Link href="/dashboard/rentals">View My Rentals</Link>
            </Button>

            <Button variant="outline">
              <Link href="/gears">Browse More Gear</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
