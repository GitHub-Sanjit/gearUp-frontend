"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PayNowButton from "@/components/payment/PayNowButton";

import { useMyRentals } from "@/hooks/useRentals";

export default function MyRentalsPage() {
  const { data, isLoading, isError } = useMyRentals();

  const rentals = data?.data.rentals ?? [];

  if (isLoading) {
    return (
      <main className="p-6">
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-muted-foreground">Loading rentals...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <div className="flex min-h-75 items-center justify-center">
          <p className="text-destructive">
            Failed to load rentals. Please try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Rentals</h1>

          <p className="mt-1 text-muted-foreground">
            Manage your rental orders, payments, and rental status.
          </p>
        </div>

        {/* Empty State */}
        {rentals.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              You haven&apos;t rented any gear yet.
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {rentals.map((rental) => {
              const canPay = rental.status === "CONFIRMED" && !rental.isPaid;

              return (
                <Card key={rental.id} className="overflow-hidden p-5">
                  <div className="flex flex-col gap-6 md:flex-row">
                    {/* Image */}
                    <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl md:w-60">
                      <Image
                        src={rental.gear.image || "/placeholder.png"}
                        alt={rental.gear.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-5">
                      {/* Title + Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            {rental.gear.name}
                          </h2>

                          <p className="text-sm text-muted-foreground">
                            {rental.gear.category?.name}
                          </p>

                          {rental.gear.brand && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              Brand: {rental.gear.brand}
                            </p>
                          )}
                        </div>

                        <Badge>{rental.status}</Badge>
                      </div>

                      {/* Rental Information */}
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <InfoItem
                          label="Start Date"
                          value={new Date(
                            rental.startDate,
                          ).toLocaleDateString()}
                        />

                        <InfoItem
                          label="End Date"
                          value={new Date(rental.endDate).toLocaleDateString()}
                        />

                        <InfoItem
                          label="Quantity"
                          value={`${rental.quantity}`}
                        />

                        <InfoItem
                          label="Total"
                          value={`$${rental.totalAmount}`}
                        />
                      </div>

                      {/* Payment Section */}
                      <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Payment Status
                          </p>

                          <div className="mt-1">
                            <Badge
                              variant={rental.isPaid ? "default" : "secondary"}
                            >
                              {rental.isPaid ? "Paid" : "Unpaid"}
                            </Badge>
                          </div>
                        </div>

                        {/* Pay Now */}
                        {canPay && <PayNowButton rentalOrderId={rental.id} />}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
