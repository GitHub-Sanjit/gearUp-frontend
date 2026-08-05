"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedGears } from "@/hooks/useFeaturedGears";

export default function FeaturedGears() {
  const { data: featuredGears, isLoading, isError } = useFeaturedGears();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          Loading gears...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-red-500">
          Failed to load gears.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Featured Gears</h2>

            <p className="text-muted-foreground mt-2">
              Popular equipment ready for your next adventure
            </p>
          </div>

          <Button variant="outline">
            <Link href="/gears">View All</Link>
          </Button>
        </div>

        {/* Gear Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGears?.map((gear) => (
            <div
              key={gear.id}
              className="
                rounded-xl border overflow-hidden
                hover:shadow-lg transition
              "
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={gear.image ?? "/placeholder.png"}
                  alt={gear.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{gear.name}</h3>

                  <Badge>{gear.condition}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  {gear.category.name}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <p className="font-semibold text-lg">
                    ${gear.dailyRentalPrice}
                    <span className="text-sm text-muted-foreground">/day</span>
                  </p>

                  <Button size="sm" variant="secondary">
                    <Link href={`/gears/${gear.id}`}>Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
