"use client";

import { useState } from "react";

import { useGears } from "@/hooks/useGears";

import GearGrid from "@/components/gear/GearGrid";
import GearFilters from "@/components/gear/GearFilters";

export default function GearsPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGears({
    search,
    limit: 12,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        Loading gears...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        Failed to load gears.
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Explore Gears</h1>

          <p className="text-muted-foreground mt-2">
            Find the perfect equipment for your next adventure.
          </p>
        </div>

        {/* Filters */}
        <GearFilters search={search} setSearch={setSearch} />

        {/* Gear List */}
        <GearGrid gears={data?.data.gears ?? []} />
      </div>
    </section>
  );
}
