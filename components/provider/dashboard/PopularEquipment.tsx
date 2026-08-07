import { Trophy } from "lucide-react";

import type { RentalOrder } from "@/types/rental";

interface PopularEquipmentProps {
  orders: RentalOrder[];
}

interface PopularGear {
  id: string;
  name: string;
  image?: string | null;
  rentalCount: number;
}

export default function PopularEquipment({ orders }: PopularEquipmentProps) {
  const gearMap = new Map<string, PopularGear>();

  orders.forEach((order) => {
    const gear = order.gear;

    if (!gear) return;

    const existing = gearMap.get(gear.id);

    if (existing) {
      existing.rentalCount += 1;
    } else {
      gearMap.set(gear.id, {
        id: gear.id,
        name: gear.name,
        image: gear.image,
        rentalCount: 1,
      });
    }
  });

  const popularGear = Array.from(gearMap.values())
    .sort((a, b) => b.rentalCount - a.rentalCount)
    .slice(0, 5);

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />

          <h2 className="text-xl font-semibold">Popular Equipment</h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Your most rented equipment
        </p>
      </div>

      <div className="p-6">
        {popularGear.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">
              No rental data available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {popularGear.map((gear, index) => (
              <div
                key={gear.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-semibold">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-medium">{gear.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {gear.rentalCount} rentals
                    </p>
                  </div>
                </div>

                {gear.image && (
                  <img
                    src={gear.image}
                    alt={gear.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
