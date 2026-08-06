"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEquipment } from '@/services/provider-equipment.service';

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEquipment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider-equipment"],
      });
    },
  });
};
