"use client";

import { Input } from "@/components/ui/input";

type GearFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function GearFilters({ search, setSearch }: GearFiltersProps) {
  return (
    <div className="mb-8">
      <Input
        placeholder="Search gears..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
