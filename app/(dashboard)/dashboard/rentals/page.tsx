"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { useMyRentals } from "@/hooks/useRentals";

export default function MyRentalsPage() {
  const { data, isLoading, isError } = useMyRentals();

  const rentals = data?.data.rentals ?? [];

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <p>Loading rentals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <p>Failed to load rentals.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">My Rentals</h1>

          <p className="text-muted-foreground">
            Manage your rental orders and track their status.
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
            {rentals.map((rental) => (
              <Card key={rental.id} className="p-5">
                <div
                  className="
                  flex
                  flex-col
                  md:flex-row
                  gap-6
                "
                >
                  {/* Image */}

                  <div
                    className="
                    relative
                    h-44
                    w-full
                    md:w-60
                    rounded-xl
                    overflow-hidden
                  "
                  >
                    <Image
                      src={rental.gear.image || "/placeholder.png"}
                      alt={rental.gear.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}

                  <div
                    className="
                    flex-1
                    space-y-5
                  "
                  >
                    <div
                      className="
                      flex
                      justify-between
                      items-start
                    "
                    >
                      <div>
                        <h2
                          className="
                          text-xl
                          font-semibold
                        "
                        >
                          {rental.gear.name}
                        </h2>

                        <p
                          className="
                          text-sm
                          text-muted-foreground
                        "
                        >
                          {rental.gear.category?.name}
                        </p>
                      </div>

                      <Badge>{rental.status}</Badge>
                    </div>

                    <div
                      className="
                      grid
                      grid-cols-2
                      md:grid-cols-4
                      gap-4
                    "
                    >
                      <InfoItem
                        label="Start Date"
                        value={new Date(rental.startDate).toLocaleDateString()}
                      />

                      <InfoItem
                        label="End Date"
                        value={new Date(rental.endDate).toLocaleDateString()}
                      />

                      <InfoItem label="Quantity" value={`${rental.quantity}`} />

                      <InfoItem
                        label="Total"
                        value={`$${rental.totalAmount}`}
                      />
                    </div>

                    <div
                      className="
                      border-t
                      pt-4
                      flex
                      justify-between
                      items-center
                    "
                    >
                      <span
                        className="
                        text-sm
                        text-muted-foreground
                      "
                      >
                        Payment Status
                      </span>

                      <Badge variant={rental.isPaid ? "default" : "secondary"}>
                        {rental.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="
        text-sm
        text-muted-foreground
      "
      >
        {label}
      </p>

      <p className="font-medium">{value}</p>
    </div>
  );
}
