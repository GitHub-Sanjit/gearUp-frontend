import { useMutation } from "@tanstack/react-query";

import {
  createRental,
  CreateRentalPayload,
} from "@/services/rental.service";


export const useCreateRental = () => {
  return useMutation({
    mutationFn: (
      payload: CreateRentalPayload,
    ) => createRental(payload),
  });
};