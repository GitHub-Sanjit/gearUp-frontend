import type { Gear } from "@/types/gear";
import GearCard from "./GearCard";

type GearGridProps = {
  gears: Gear[];
};

export default function GearGrid({ gears }: GearGridProps) {
  if (!gears.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No gears found.
      </div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3
        gap-6
      "
    >
      {gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
