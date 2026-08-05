"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useGear } from "@/hooks/useGear";

export default function GearDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const { data: gear, isLoading, isError } = useGear(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        Loading gear...
      </div>
    );
  }

  if (isError || !gear) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        Failed to load gear.
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative h-[450px] rounded-xl overflow-hidden border">
            <Image
              src={gear.image ?? "/placeholder.png"}
              alt={gear.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">{gear.name}</h1>

              <Badge>{gear.condition}</Badge>
            </div>

            <p className="mt-4 text-muted-foreground">{gear.category.name}</p>

            <p className="text-3xl font-bold mt-6">
              ${gear.dailyRentalPrice}
              <span className="text-base font-normal text-muted-foreground">
                /day
              </span>
            </p>

            <p className="mt-6 leading-7">{gear.description}</p>

            <div className="mt-8 space-y-3">
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                {gear.brand ?? "N/A"}
              </p>

              <p>
                <span className="font-semibold">Available:</span>{" "}
                {gear.availableQuantity} items
              </p>
            </div>

            <Button size="lg" className="mt-8">
              Rent Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
