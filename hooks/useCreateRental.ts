import { createRentalOrder } from "@/services/rental.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateRental = () => {
  return useMutation({
    mutationFn: createRentalOrder,
  });
};
