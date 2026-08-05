import { useMutation } from "@tanstack/react-query";
import { createRental } from "@/services/rental.service";

export const useCreateRental = () => {
  return useMutation({
    mutationFn: createRental,
  });
};
