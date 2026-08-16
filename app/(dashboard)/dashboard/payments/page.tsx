"use client";

import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Clock3,
  XCircle,
} from "lucide-react";

import { useMyPayments } from "@/hooks/usePayments";
import type { MyPayment } from "@/types/payment";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PaymentsPage() {
  const { data, isLoading, isError } = useMyPayments();

  const payments = data?.data ?? [];

  if (isLoading) {
    return (
      <main className="p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <PaymentPageHeader />

          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <PaymentSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <PaymentPageHeader />

          <Card className="p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              Failed to load payments
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn&apos;t retrieve your payment history. Please try again
              later.
            </p>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <PaymentPageHeader />

        {payments.length === 0 ? (
          <EmptyPayments />
        ) : (
          <div className="space-y-5">
            {payments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function PaymentPageHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>

          <p className="mt-1 text-muted-foreground">
            View and track all payments made for your rentals.
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentCard({ payment }: { payment: MyPayment }) {
  const rental = payment.rentalOrder;
  const gear = rental.gear;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-6 p-5 md:flex-row">
        {/* Gear Image */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl md:w-56">
          <Image
            src={gear.image || "/placeholder.png"}
            alt={gear.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Payment Content */}
        <div className="flex-1 space-y-5">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rental Payment</p>

              <h2 className="text-xl font-semibold">{gear.name}</h2>

              {gear.brand && (
                <p className="text-sm text-muted-foreground">{gear.brand}</p>
              )}
            </div>

            <PaymentStatusBadge status={payment.status} />
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <InfoItem label="Amount" value={`$${payment.amount.toFixed(2)}`} />

            <InfoItem
              label="Provider"
              value={formatPaymentProvider(payment.provider)}
            />

            <InfoItem
              label="Payment Date"
              value={formatDate(payment.paidAt || payment.createdAt)}
            />

            <InfoItem
              label="Rental Status"
              value={formatRentalStatus(rental.status)}
            />
          </div>

          {/* Rental Dates */}
          <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />

              <span>
                {formatDate(rental.startDate)} — {formatDate(rental.endDate)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Payment ID:{" "}
              <span className="font-mono text-xs text-foreground">
                {payment.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PaymentStatusBadge({ status }: { status: MyPayment["status"] }) {
  if (status === "COMPLETED") {
    return (
      <Badge className="gap-1">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Completed
      </Badge>
    );
  }

  if (status === "FAILED") {
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3.5 w-3.5" />
        Failed
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </Badge>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function EmptyPayments() {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <CreditCard className="h-7 w-7 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">No payments yet</h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        You haven&apos;t made any payments for your rental orders yet. Completed
        payments will appear here.
      </p>
    </Card>
  );
}

function PaymentSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-6 p-5 md:flex-row">
        <div className="h-44 w-full animate-pulse rounded-xl bg-muted md:w-56" />

        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function formatPaymentProvider(provider: MyPayment["provider"]) {
  if (provider === "SSLCOMMERZ") {
    return "SSLCommerz";
  }

  return "Stripe";
}

function formatRentalStatus(status: MyPayment["rentalOrder"]["status"]) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
