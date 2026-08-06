"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getMyEquipment,
  deleteEquipment,
} from "@/services/provider-equipment.service";

export const useProviderEquipment = () => {
  return useQuery({
    queryKey: ["provider-equipment"],
    queryFn: getMyEquipment,
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEquipment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-equipment"],
      });
    },
  });
};
