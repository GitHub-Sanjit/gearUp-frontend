import { z } from "zod";

export const rentalSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    quantity: z.number().min(1, "Minimum quantity is 1"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type RentalInput = z.infer<typeof rentalSchema>;
