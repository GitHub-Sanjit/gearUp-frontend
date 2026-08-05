/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { rentalSchema, RentalInput } from "@/schemas/rental.schema";

import { useCreateRental } from "@/hooks/useCreateRental";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RentalInput>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const quantity = watch("quantity") || 1;

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = end.getTime() - start.getTime();

    if (diff <= 0) return 0;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const totalAmount = totalDays * quantity * pricePerDay;

  const onSubmit = async (values: RentalInput) => {
    try {
      await mutateAsync({
        gearId,
        ...values,
      });

      toast.success("Rental created successfully!");

      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Failed to create rental");
    }
  };

  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-background">
      <h2 className="text-2xl font-bold mb-6">Rent This Gear</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-medium">Start Date</label>

          <Input type="date" {...register("startDate")} />

          <p className="text-red-500 text-sm mt-1">
            {errors.startDate?.message}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">End Date</label>

          <Input type="date" {...register("endDate")} />

          <p className="text-red-500 text-sm mt-1">{errors.endDate?.message}</p>
        </div>

        <div>
          <label className="text-sm font-medium">Quantity</label>

          <Input
            type="number"
            min={1}
            max={availableQuantity}
            {...register("quantity")}
          />

          <p className="text-sm text-muted-foreground mt-1">
            Available: {availableQuantity}
          </p>

          <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
        </div>

        <div className="rounded-xl bg-muted/50 p-5 space-y-2">
          <div className="flex justify-between">
            <span>Price / day</span>
            <span>${pricePerDay}</span>
          </div>

          <div className="flex justify-between">
            <span>Days</span>
            <span>{totalDays}</span>
          </div>

          <div className="flex justify-between">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl"
          disabled={isPending}
        >
          {isPending ? "Creating Rental..." : "Confirm Rental"}
        </Button>
      </form>
    </div>
  );
}
