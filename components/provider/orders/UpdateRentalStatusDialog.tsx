"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { useUpdateRentalStatus } from "@/hooks/useRentals";

import { RentalStatus } from "@/types/rental";

interface UpdateRentalStatusDialogProps {
  rentalId: string;
  status: RentalStatus;
  buttonText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary";
}

export default function UpdateRentalStatusDialog({
  rentalId,
  status,
  buttonText,
  buttonVariant = "default",
}: UpdateRentalStatusDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateRentalStatus();

  const handleUpdate = async () => {
    try {
      await mutateAsync({
        id: rentalId,
        payload: {
          status,
        },
      });

      toast.success("Rental status updated successfully");

      setOpen(false);
    } catch (error) {
      toast.error("Failed to update rental status");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button size="sm" variant={buttonVariant}>
          {buttonText}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Rental Status</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to update this rental status to{" "}
            <strong>{status}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();

              handleUpdate();
            }}
          >
            {isPending ? "Updating..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
