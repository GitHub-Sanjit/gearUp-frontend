"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EquipmentForm from "./EquipmentForm";

interface AddEquipmentDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export default function AddEquipmentDialog({
  open,
  onOpenChange,
}: AddEquipmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Equipment</DialogTitle>
        </DialogHeader>

        <EquipmentForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
