"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Package,
  ShoppingBag,
} from "lucide-react";

import { useMyRentals } from "@/hooks/useRentals";
import { useMyPayments } from "@/hooks/usePayments";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { data: rentalsData, isLoading: rentalsLoading } = useMyRentals();

  const { data: paymentsData, isLoading: paymentsLoading } = useMyPayments();

  const rentals = rentalsData?.data?.rentals ?? [];
  const payments = paymentsData?.data ?? [];

  const activeRentals = rentals.filter(
    (rental) =>
      rental.status === "CONFIRMED" ||
      rental.status === "PAID" ||
      rental.status === "PICKED_UP",
  );

  const totalPaid = payments
    .filter((payment) => payment.status === "COMPLETED")
    .reduce((total, payment) => total + payment.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Customer Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your rentals, payments, and equipment bookings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Rentals"
          value={rentalsLoading ? "..." : rentals.length.toString()}
          description="All your rental orders"
          icon={ShoppingBag}
        />

        <StatCard
          title="Active Rentals"
          value={rentalsLoading ? "..." : activeRentals.length.toString()}
          description="Currently active"
          icon={Package}
        />

        <StatCard
          title="Payments"
          value={paymentsLoading ? "..." : payments.length.toString()}
          description="Payment transactions"
          icon={CreditCard}
        />

        <StatCard
          title="Total Paid"
          value={paymentsLoading ? "..." : `$${totalPaid.toFixed(2)}`}
          description="Completed payments"
          icon={CreditCard}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button >
              <Link href="/gears">
                <Package className="mr-2 h-4 w-4" />
                Browse Equipment
              </Link>
            </Button>

            <Button variant="outline" >
              <Link href="/dashboard/rentals">
                <ShoppingBag className="mr-2 h-4 w-4" />
                My Rentals
              </Link>
            </Button>

            <Button variant="outline" >
              <Link href="/dashboard/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Rentals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Rentals</CardTitle>

            <Button variant="ghost" size="sm" >
              <Link href="/dashboard/rentals">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {rentalsLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading rentals...
              </div>
            ) : rentals.length === 0 ? (
              <div className="py-6 text-center">
                <Package className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-3 text-sm text-muted-foreground">
                  You haven&apos;t rented any equipment yet.
                </p>

                <Button variant="link" className="mt-1" >
                  <Link href="/gears">Browse Equipment</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.slice(0, 4).map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{rental.gear.name}</p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />

                        {formatDate(rental.startDate)}
                        {" — "}
                        {formatDate(rental.endDate)}
                      </p>
                    </div>

                    <Badge variant="secondary">
                      {formatStatus(rental.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments</CardTitle>

            <Button variant="ghost" size="sm" >
              <Link href="/dashboard/payments">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {paymentsLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading payments...
              </div>
            ) : payments.length === 0 ? (
              <div className="py-6 text-center">
                <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-3 text-sm text-muted-foreground">
                  No payments yet.
                </p>

                <Button variant="link" className="mt-1">
                  <Link href="/dashboard/payments">View Payment History</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.slice(0, 4).map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {payment.rentalOrder.gear.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ${payment.amount.toFixed(2)}
                      </p>

                      <Badge
                        variant={
                          payment.status === "COMPLETED"
                            ? "default"
                            : payment.status === "FAILED"
                              ? "destructive"
                              : "secondary"
                        }
                        className="mt-1"
                      >
                        {formatStatus(payment.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold">{value}</p>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
