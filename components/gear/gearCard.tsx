import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Gear } from "@/types/gear";

type GearCardProps = {
  gear: Gear;
};

export default function GearCard({ gear }: GearCardProps) {
  return (
    <div
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
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
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

        <div className="flex justify-between items-center mt-5">
          <p className="font-semibold text-lg">
            ${gear.dailyRentalPrice}
            <span className="text-sm text-muted-foreground">/day</span>
          </p>

          <Button size="sm">
            <Link href={`/gears/${gear.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
