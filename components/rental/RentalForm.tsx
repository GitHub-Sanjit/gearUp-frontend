"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCreateRental } from "@/hooks/useCreateRental";

interface RentalFormProps {
  gearId: string;
  pricePerDay: number;
  availableQuantity: number;
}

export default function RentalForm({
  gearId,
  pricePerDay,
  availableQuantity,
}: RentalFormProps) {
  const { mutateAsync, isPending } = useCreateRental();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const totalAmount = totalDays * pricePerDay * quantity;

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select rental dates");
      return;
    }

    if (totalDays <= 0) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      await mutateAsync({
        gearId,
        quantity,
        startDate,
        endDate,
      });

      toast.success("Rental created successfully");
    } catch (error) {
      toast.error("Failed to create rental");
    }
  };

  return (
    <div className="space-y-5 border rounded-xl p-6">
      <h2 className="text-xl font-semibold">Rent this gear</h2>

      <div>
        <label className="text-sm">Start Date</label>

        <input
          type="date"
          className="border rounded-md w-full p-2 mt-1"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">End Date</label>

        <input
          type="date"
          className="border rounded-md w-full p-2 mt-1"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Quantity</label>

        <input
          type="number"
          min={1}
          max={availableQuantity}
          className="border rounded-md w-full p-2 mt-1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="rounded-lg bg-muted p-4">
        <p>
          Days: <strong>{totalDays}</strong>
        </p>

        <p>
          Total: <strong>${totalAmount}</strong>
        </p>
      </div>

      <Button className="w-full" disabled={isPending} onClick={handleSubmit}>
        {isPending ? "Creating..." : "Confirm Rental"}
      </Button>
    </div>
  );
}
