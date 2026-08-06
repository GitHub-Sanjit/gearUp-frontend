"use client";

import { useState } from "react";

import LoadingSkeleton from "@/components/provider/orders/LoadingSkeleton";

import EmptyEquipment from "@/components/provider/equipment/EmptyEquipment";
import ProviderEquipmentTable from "@/components/provider/equipment/ProviderEquipmentTable";
import AddEquipmentDialog from "@/components/provider/equipment/AddEquipmentDialog";
import EditEquipmentDialog from "@/components/provider/equipment/EditEquipmentDialog";
import DeleteEquipmentDialog from "@/components/provider/equipment/DeleteEquipmentDialog";

import { Button } from "@/components/ui/button";

import { useProviderEquipment } from "@/hooks/useProviderEquipment";

import type { Gear } from "@/types/gear";

export default function ProviderEquipmentPage() {
  const { data: gears = [], isLoading, isError } = useProviderEquipment();

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [selectedGear, setSelectedGear] = useState<Gear | null>(null);

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Equipment</h1>

          <p className="text-muted-foreground">
            Manage your listed rental equipment.
          </p>
        </div>

        <Button onClick={() => setOpenAddDialog(true)}>Add Equipment</Button>
      </div>

      {gears.length === 0 ? (
        <EmptyEquipment />
      ) : (
        <ProviderEquipmentTable
          gears={gears}
          onEdit={(gear) => {
            setSelectedGear(gear);

            setOpenEditDialog(true);
          }}
          onDelete={(gear) => {
            setSelectedGear(gear);

            setOpenDeleteDialog(true);
          }}
        />
      )}

      <AddEquipmentDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
      />

      <EditEquipmentDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        gear={selectedGear}
      />

      <DeleteEquipmentDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        gear={selectedGear}
      />
    </div>
  );
}
