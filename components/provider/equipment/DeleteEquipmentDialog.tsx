"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Gear } from "@/types/gear";

import { useDeleteEquipment } from "@/hooks/useProviderEquipment";

import { toast } from "sonner";

interface DeleteEquipmentDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  gear: Gear | null;
}

export default function DeleteEquipmentDialog({
  open,
  onOpenChange,
  gear,
}: DeleteEquipmentDialogProps) {
  const deleteEquipment = useDeleteEquipment();

  const handleDelete = async () => {
    if (!gear) return;

    try {
      await deleteEquipment.mutateAsync(gear.id);

      toast.success("Equipment deleted successfully");

      onOpenChange(false);
    } catch {
      toast.error("Failed to delete equipment");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium">{gear?.name}</span>? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteEquipment.isPending}
          >
            {deleteEquipment.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
