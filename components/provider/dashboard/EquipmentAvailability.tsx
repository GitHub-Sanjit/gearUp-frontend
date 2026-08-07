import { AlertTriangle, PackageCheck } from "lucide-react";

import type { Gear } from "@/types/gear";

interface EquipmentAvailabilityProps {
  gears: Gear[];
}

export default function EquipmentAvailability({
  gears,
}: EquipmentAvailabilityProps) {
  const equipment = [...gears]
    .sort((a, b) => a.availableQuantity - b.availableQuantity)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center gap-2">
          <PackageCheck className="h-5 w-5" />

          <h2 className="text-xl font-semibold">Equipment Availability</h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your inventory status
        </p>
      </div>

      <div className="p-6">
        {equipment.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">No equipment available.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {equipment.map((gear) => {
              const percentage =
                gear.stockQuantity > 0
                  ? Math.round(
                      (gear.availableQuantity / gear.stockQuantity) * 100,
                    )
                  : 0;

              const isOutOfStock = gear.availableQuantity === 0;

              return (
                <div key={gear.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{gear.name}</h3>

                      <p className="text-sm text-muted-foreground">
                        {gear.availableQuantity} available
                        {" / "}
                        {gear.stockQuantity} total
                      </p>
                    </div>

                    {isOutOfStock && (
                      <div className="flex items-center gap-1 text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        Out of stock
                      </div>
                    )}
                  </div>

                  <div className="mt-4 h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${
                        isOutOfStock ? "bg-red-500" : "bg-primary"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {percentage}% available
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
