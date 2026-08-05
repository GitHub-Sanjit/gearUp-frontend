import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createRentalOrder,
  getMyRentalOrders,
  getRentalOrderById,
  getProviderOrders,
  updateRentalStatus,
} from "@/services/rental.service";

import {
  CreateRentalOrderPayload,
  UpdateRentalStatusPayload,
} from "@/types/rental";

// =====================================
// CUSTOMER
// =====================================

// Create Rental Order
export const useCreateRental = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRentalOrderPayload) =>
      createRentalOrder(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-rentals"],
      });
    },
  });
};

// Get My Rentals
export const useMyRentals = () => {
  return useQuery({
    queryKey: ["my-rentals"],

    queryFn: getMyRentalOrders,
  });
};

// Get Single Rental
export const useRentalById = (id: string) => {
  return useQuery({
    queryKey: ["rental", id],

    queryFn: () => getRentalOrderById(id),

    enabled: Boolean(id),
  });
};

// =====================================
// PROVIDER
// =====================================

// Get Provider Orders
export const useProviderOrders = () => {
  return useQuery({
    queryKey: ["provider-orders"],

    queryFn: getProviderOrders,
  });
};

// Update Rental Status
export const useUpdateRentalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateRentalStatusPayload;
    }) => updateRentalStatus(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-rentals"],
      });
    },
  });
};
