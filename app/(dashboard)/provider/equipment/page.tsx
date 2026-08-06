"use client";

import LoadingSkeleton from "@/components/provider/orders/LoadingSkeleton";
import { useProviderEquipment } from "@/hooks/useProviderEquipment";
import { EmptyEquipment } from '@/components/provider/equipment/EmptyEquipment';
import { ProviderEquipmentTable } from '@/components/provider/equipment/ProviderEquipmentTable';



export default function ProviderEquipmentPage() {
  const { data, isLoading, isError } = useProviderEquipment();

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">My Equipment</h1>

          <p className="text-muted-foreground">
            Manage your listed rental equipment.
          </p>
        </div>

        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load equipment.</p>
      </div>
    );
  }

  const gears = data ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">My Equipment</h1>

        <p className="text-muted-foreground">
          Manage your listed rental equipment.
        </p>
      </div>

      {gears.length === 0 ? (
        <EmptyEquipment />
      ) : (
        <ProviderEquipmentTable gears={gears} />
      )}
    </div>
  );
}
