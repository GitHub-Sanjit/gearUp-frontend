/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useCreateRental } from "@/hooks/useRentals";

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
  const router = useRouter();

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

  const totalAmount = totalDays > 0 ? totalDays * pricePerDay * quantity : 0;

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select rental dates");

      return;
    }

    if (totalDays <= 0) {
      toast.error("End date must be after start date");

      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");

      return;
    }

    if (quantity > availableQuantity) {
      toast.error(`Only ${availableQuantity} item(s) available`);

      return;
    }

    try {
      await mutateAsync({
        gearId,

        startDate,

        endDate,

        quantity,
      });

      toast.success("Rental created successfully");

      router.push("/dashboard/rentals");
    } catch (error) {
      toast.error("Failed to create rental");
    }
  };

  return (
    <div
      className="
        space-y-5
        border
        rounded-xl
        p-6
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Rent this gear
      </h2>

      {/* Start Date */}

      <div>
        <label className="text-sm">Start Date</label>

        <input
          type="date"
          className="
            border
            rounded-md
            w-full
            p-2
            mt-1
          "
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date */}

      <div>
        <label className="text-sm">End Date</label>

        <input
          type="date"
          className="
            border
            rounded-md
            w-full
            p-2
            mt-1
          "
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Quantity */}

      <div>
        <label className="text-sm">Quantity</label>

        <input
          type="number"
          min={1}
          max={availableQuantity}
          className="
            border
            rounded-md
            w-full
            p-2
            mt-1
          "
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value >= 1 && value <= availableQuantity) {
              setQuantity(value);
            }
          }}
        />
      </div>

      {/* Price Summary */}

      <div
        className="
          rounded-lg
          bg-muted
          p-4
          space-y-2
        "
      >
        <p>
          Days: <strong>{totalDays}</strong>
        </p>

        <p>
          Price/day: <strong>${pricePerDay}</strong>
        </p>

        <p>
          Quantity: <strong>{quantity}</strong>
        </p>

        <p>
          Total: <strong>${totalAmount}</strong>
        </p>
      </div>

      {/* Submit */}

      <Button className="w-full" disabled={isPending} onClick={handleSubmit}>
        {isPending ? "Creating..." : "Confirm Rental"}
      </Button>
    </div>
  );
}
